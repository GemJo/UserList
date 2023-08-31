const DEFAULT_MIN_LENGTH_STRING = 3;
const DEFAULT_MAX_LENGTH_STRING = 100;
export default class Validations {
  public static required<T>(value: T): boolean | string {
    if (typeof value === 'string') {
      return value.trim() !== '' ? true : 'El campo es requerido';
    }

    return value ? true : 'El campo es requerido';
  }

  public static lengthString(
    value: string,
    { min, max }: { min?: number, max?: number } | undefined = { min: DEFAULT_MIN_LENGTH_STRING, max: DEFAULT_MAX_LENGTH_STRING },
  ): boolean | string {
    const minLength = min || DEFAULT_MIN_LENGTH_STRING;
    const maxLength = max || DEFAULT_MAX_LENGTH_STRING;
    const valueTrimmed = value.trim();

    if (valueTrimmed.trim().length === 0) {
      return true;
    }

    return valueTrimmed.length >= minLength && valueTrimmed.length <= maxLength ? true : `El campo debe contener más de ${minLength} y menos de ${maxLength} caracteres`
  }

  public static minLengthString(
    value: string,
    min: number | undefined = DEFAULT_MIN_LENGTH_STRING,
  ): boolean | string {
    const valueTrimmed = value.trim();
    if (valueTrimmed.trim().length === 0) {
      return true;
    }

    return valueTrimmed.length >= min ? true : `El campo debe contener más de ${min} caracteres`
  }

  public static maxLengthString(
    value: string,
    max: number | undefined = DEFAULT_MAX_LENGTH_STRING,
  ): boolean | string {
    const valueTrimmed = value.trim();
    if (valueTrimmed.trim().length === 0) {
      return true;
    }

    return valueTrimmed.length <= max ? true : `El campo debe contener menos de ${max} caracteres`
  }

  public static email(value: string): boolean | string {
    const regex = /^(?![.+\-_])([\w.+-]*)[\w-]@[a-zA-Z0-9]([\w\-.]{0,61})[a-zA-Z0-9]\.([a-zA-Z0-9]{2,})$/i;
    return regex.test(value) ? true : 'El email es incorrecto';
  }

  public static number(value: number | string): boolean | string {
    const num = parseInt(value);
    return Number.isInteger(num) ? true : 'El valor debe de ser un número';
  }

  public static positiveNumber(value: number): boolean | string {
    const num = parseInt(value);
    return Number.isInteger(num) && value >= 0 ? true : 'El valor debe de ser un número positivo';
  }

  public static getValidations(): {[key: stirng]: (value: unknown) => boolean | stirng} {
    return {
      required: this.required,
      lengthString: this.lengthString,
      email: this.email,
      number: this.number,
      positiveNumber: this.positiveNumber,
    };
  }

  public static getValidationComponent(validation: string, args: unknown) {
    return (rule: any, value: any, callback: any) => {
      const result = this.getValidations()[validation](value, args);
      if (result === true) {
        callback();
        return;
      }

      callback(new Error(result));
    }
  }
}
