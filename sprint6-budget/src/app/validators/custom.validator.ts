import { AbstractControl, ValidatorFn } from "@angular/forms";

export function telephoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const valid = /^[69]\d{8}$/.test(control.value);

        return valid ? null : { 'telephoneInvalid': { value: control.value } };
    };
}

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const emailRegex = /^(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?<![_.-])$/;
        const valid = emailRegex.test(control.value);
        // console.log(valid);

        return valid ? null : { 'emailInvalid': { value: control.value } };
    }
}