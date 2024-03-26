import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from "@angular/forms";

export function SyncQueryParam(
  config: any = {
    parseIgnore: [],
  }
) {
  return function (target: any, propertyKey: string) {
    let srcSearchObj: any;
    let activatedRoute: ActivatedRoute;
    let router: Router;
    const ngOnInitUnPatched = target.ngOnInit;

    target.ngOnInit = function (this) {
      activatedRoute = this.injector.get(ActivatedRoute);
      router = this.injector.get(Router);

      // sync form to params
      if (target[propertyKey] instanceof FormGroup && target[propertyKey]) {
        target[propertyKey].valueChanges.subscribe((v: any) => {
          syncObjectToParams(activatedRoute, router, v);
        });
      }
      // subscribe URL params change to sync search form
      activatedRoute.queryParams.subscribe((params) => {
        const temp = JSON.parse(JSON.stringify(params));
        Object.keys(temp).forEach((k: any) => {
          if (temp[k].indexOf(";") !== -1) {
            temp[k] = temp[k].split(";");
            temp[k] = temp[k].filter((i: any) => !!i);
            temp[k] = temp[k].map((i: any) => (isNaN(i) ? i : +i));
          } else {
            if (!config.parseIgnore.includes(k)) {
              temp[k] = isNaN(temp[k]) || !temp[k] ? temp[k] : +temp[k];
            }
          }
        });
        if (target[propertyKey] instanceof FormGroup && target[propertyKey]) {
          target[propertyKey].patchValue(temp, { emitEvent: false });
        } else if (typeof target[propertyKey] === "object") {
          target[propertyKey] = temp;
        }
      });
      if (ngOnInitUnPatched) {
        return ngOnInitUnPatched.call(this);
      }
    };
    function getter() {
      return srcSearchObj;
    }
    function setter(value: any) {
      srcSearchObj = value;
    }
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

function syncObjectToParams(activatedRoute: any, router: any, obj: any) {
  if (activatedRoute) {
    const params = {};
    buildHTTPGetParamsFromObject(obj, params);
    router
      .navigate(["."], {
        relativeTo: activatedRoute,
        queryParams: params,
      })
      .then();
  }
}

export function buildHTTPGetParamsFromObject(obj: any, params: any) {
  params = params || {};
  Object.keys(obj).forEach((key) => {
    const controlValue = obj[key];
    if (Array.isArray(controlValue) && controlValue.length > 0) {
      params[key] = "";
      controlValue.forEach((v) => {
        params[key] += v + ";";
      });
      return;
    }

    if (controlValue instanceof Date) {
      params[key] = controlValue.toISOString();
    } else if (typeof controlValue === "object" && controlValue) {
      buildHTTPGetParamsFromObject(controlValue, params);
    } else if (controlValue !== null) {
      params[key] = controlValue;
    }
  });
}
