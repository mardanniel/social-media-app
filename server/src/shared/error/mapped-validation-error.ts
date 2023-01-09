import { Error } from 'mongoose';

export class MappedValidationError {
  constructor(validationErrors: Error.ValidationError) {
    let errors: { [path: string]: { msg: string } } = {};

    for (const [key, value] of Object.entries(validationErrors.errors)) {
      errors[key] = { msg: value.message };
    }

    return errors;
  }
}
