import { postalCodeRegexMap } from './postalCode';
import Isemail from 'isemail';
import differenceInYears from 'date-fns/differenceInYears';

export class FormValidator {
  static emailValidator(email: string) {
    if (email[0] === ' ') {
      return false;
    }

    if (Isemail.validate(email)) {
      const emailFilter = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]{2,})/;

      return emailFilter.test(email);
    } else {
      return false;
    }
  }

  static passwordValidator(password: string) {
    if (password[0] === ' ' || password.slice(-1) === ' ') {
      return false;
    }
    const passwordFilter =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d\s!@#$%^&*]{8,}$/;

    return passwordFilter.test(password);
  }

  static nameValidator(name: string) {
    const nameFilter = /[^а-яА-ЯёЁa-zA-Z]+/g;

    return nameFilter.test(name);
  }

  static ageValidator(birthDate: Date | null | undefined) {
    if (!birthDate) {
      return false;
    }
    const today = new Date();
    const age = differenceInYears(today, birthDate);
    return age >= 13;
  }

  static postalCodeValidator(postalCode: string, country: string) {
    const regExp = postalCodeRegexMap[country as keyof typeof postalCodeRegexMap];

    return regExp.test(postalCode);
  }

  static cityValidator(city: string) {
    const regExp = /^[a-zA-Zа-яА-ЯёЁ]+(?:[ ]?[a-zA-Zа-яА-ЯёЁ]+)*$/;

    return regExp.test(city);
  }
}
