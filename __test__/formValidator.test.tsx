import { expect, test } from 'vitest';
import { FormValidator } from '../src/helpers/formValidator';

test('email validator', () => {
  expect(FormValidator.emailValidator('email@mail.com')).toBe(true);
  expect(FormValidator.emailValidator('email@mail@com')).toBe(false);
  expect(FormValidator.emailValidator('email@mail..com')).toBe(false);
  expect(FormValidator.emailValidator(' email@mail.com')).toBe(false);
  expect(FormValidator.emailValidator('email@email@mail.com')).toBe(false);
  expect(FormValidator.emailValidator('email@@mail.com')).toBe(false);
  expect(FormValidator.emailValidator('email@mail.mail.com')).toBe(true);
  expect(FormValidator.emailValidator('email@mail.mail.com.ru')).toBe(true);
  expect(FormValidator.emailValidator('email@mail')).toBe(false);
});

test('password validator', () => {
  expect(FormValidator.passwordValidator('1!qQqwed')).toBe(true);
  expect(FormValidator.passwordValidator(' 1!qQqwed')).toBe(false);
  expect(FormValidator.passwordValidator('1!qQqwed ')).toBe(false);
  expect(FormValidator.passwordValidator('fsfsdf!@#')).toBe(false);
  expect(FormValidator.passwordValidator('2@wWert')).toBe(false);
});

test('name validator', () => {
  expect(FormValidator.nameValidator(' ')).toBe(true);
  expect(FormValidator.nameValidator(' Evgenii')).toBe(true);
  expect(FormValidator.nameValidator('Evgenii')).toBe(false);
  expect(FormValidator.nameValidator('evgenii')).toBe(false);
  expect(FormValidator.nameValidator('evgenii ')).toBe(true);
  expect(FormValidator.nameValidator('evgenii evgenii')).toBe(true);
});

test('age validator', () => {
  expect(FormValidator.ageValidator(new Date())).toBe(false);
  expect(FormValidator.ageValidator(new Date(2000, 1, 1))).toBe(true);
  expect(FormValidator.ageValidator(new Date(2015, 23, 10))).toBe(false);
  expect(FormValidator.ageValidator(new Date(2009, 7, 18))).toBe(true);
  expect(FormValidator.ageValidator(new Date(2010, 7, 15))).toBe(false);
});

test('postal code validator', () => {
  expect(FormValidator.postalCodeValidator('12345', 'US')).toBe(true);
  expect(FormValidator.postalCodeValidator('123450', 'US')).toBe(false);
  expect(FormValidator.postalCodeValidator('M5H 2N2', 'CA')).toBe(true);
  expect(FormValidator.postalCodeValidator('12345', 'CA')).toBe(false);
});
