import { FormControl, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormSearchOrderHistoryHelper {
  readonly #form: FormGroup;

  constructor() {
    this.#form = FormSearchOrderHistoryHelper.initForm();
  }

  get form() {
    return this.#form as FormGroup;
  }

  private static initForm(data?: any): FormGroup {
    return new FormGroup({
      page: new FormControl(data?.page || ""),
      sort: new FormControl(data?.sort || ""),
      s: new FormControl(data?.s || ""),
      status: new FormControl(data?.status || ""),
      createdFrom: new FormControl(data?.createdFrom || null),
      createdTo: new FormControl(data?.createdTo || null),
    });
  }
}
