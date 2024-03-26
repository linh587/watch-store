import { FormControl, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormSearchHelper {
  readonly #form: FormGroup;

  constructor() {
    this.#form = FormSearchHelper.initForm();
  }

  get form() {
    return this.#form as FormGroup;
  }

  private static initForm(data?: any): FormGroup {
    return new FormGroup({
      page: new FormControl(data?.page || ""),
      includes: new FormControl(data?.includes || ""),
      status: new FormControl(data?.status || ""),
      categoryId: new FormControl(data?.categoryId || ""),
      sort: new FormControl(data?.sort || ""),
      s: new FormControl(data?.s || ""),
    });
  }
}
