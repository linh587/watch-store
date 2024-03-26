import { filter } from "rxjs/operators";
import { FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { FormSearchHelper } from "./form-search.helper";

@Injectable({
  providedIn: "root",
})
export class SyncUrlWithSearchRealEstateHelper {
  public static route: any;
  public static router: any;
  public static form: any;

  constructor(
    public _router: Router,
    public _route: ActivatedRoute,
    public _formService: FormSearchHelper
  ) {
    SyncUrlWithSearchRealEstateHelper.route = _route;
    SyncUrlWithSearchRealEstateHelper.form = _formService.form as FormGroup;
    SyncUrlWithSearchRealEstateHelper.router = _router;
  }

  syncQueryParams(key: string, value: any): void {
    const params = { ...this._formService.form.getRawValue(), [key]: value };
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { ...params },
      queryParamsHandling: "merge",
    });
  }

  public static activeRoute() {
    return SyncUrlWithSearchRealEstateHelper.route;
  }

  public static formGroup() {
    return SyncUrlWithSearchRealEstateHelper.form as FormGroup;
  }

  public static routerP() {
    return SyncUrlWithSearchRealEstateHelper.router;
  }
}

export const SyncFormSearchWithRoute = (): any => {
  return (
    target: object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const activeRoute$ =
      SyncUrlWithSearchRealEstateHelper.activeRoute() as ActivatedRoute;
    const formGroup$ = SyncUrlWithSearchRealEstateHelper.formGroup();
    const router$ = SyncUrlWithSearchRealEstateHelper.routerP() as Router;

    router$.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((_) => {
        activeRoute$.queryParams.subscribe((data) => {
          if (!Object.keys(data)) {
            const params = formGroup$.getRawValue();
            router$.navigate([], {
              relativeTo: activeRoute$,
              queryParams: { ...params },
              queryParamsHandling: "merge",
            });
          }
        });
      });
    return descriptor;
  };
};
