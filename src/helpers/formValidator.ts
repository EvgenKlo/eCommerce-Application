export class FormValidator {
  static emailValidator(email: string) {
    if (email[0] === ' ') {
      return false;
    }

    const emailFilter = /^([a-zA-Z0-9_\s.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

    return emailFilter.test(email);
  }

  static passwordValodator(password: string) {
    const passwordFilter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    return passwordFilter.test(password);
  }
}
