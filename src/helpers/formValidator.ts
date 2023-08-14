import { postalCodeRegexMap } from './postalCode';

export class FormValidator {
  static emailValidator(email: string) {
    if (email[0] === ' ') {
      return false;
    }

    const emailFilter = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;

    return emailFilter.test(email);
  }

  static passwordValodator(password: string) {
    const passwordFilter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    return passwordFilter.test(password);
  }

  static nameValodator(name: string) {
    const nameFilter = /[^а-яА-ЯёЁa-zA-Z]+/g;

    return nameFilter.test(name);
  }

  static ageValodator(age: Date) {
    const customerAge = (+new Date() - +age) / 1000 / 60 / 60 / 24 / 365;
    if (customerAge >= 14) {
      return true;
    }
  }

  static postalCodeValodator(postalCode: string, country: string) {
    const regExp = postalCodeRegexMap[country as keyof typeof postalCodeRegexMap];

    return regExp.test(postalCode);
  }
}
