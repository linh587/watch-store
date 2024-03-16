import { FormControl } from "@angular/forms";

export function phoneValidator(control: FormControl) {
  const emailRegexp = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidPhoneNumber: true };
  }

  return null;
}
