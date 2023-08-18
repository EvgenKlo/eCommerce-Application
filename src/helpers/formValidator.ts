import { postalCodeRegexMap } from './postalCode';
import Isemail from 'isemail';

export class FormValidator {
  static emailValidator(email: string) {
    if (email[0] === ' ') {
      return false;
    }

    if (Isemail.validate(email)) {
      const emailFilter = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;

      return emailFilter.test(email);
    } else {
      return false;
    }
  }

  static passwordValidator(password: string) {
    const passwordFilter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    return passwordFilter.test(password);
  }

  static nameValidator(name: string) {
    const nameFilter = /[^а-яА-ЯёЁa-zA-Z]+/g;

    return nameFilter.test(name);
  }

  static ageValidator(age: Date) {
    const customerAge = (+new Date() - +age) / 1000 / 60 / 60 / 24 / 365;
    if (customerAge >= 14) {
      return true;
    }
    return false;
  }

  static postalCodeValidator(postalCode: string, country: string) {
    const regExp = postalCodeRegexMap[country as keyof typeof postalCodeRegexMap];

    return regExp.test(postalCode);
  }
}
