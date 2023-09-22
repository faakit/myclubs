import { ValidationError } from 'joi';

export class FieldValidationError extends ValidationError {
  constructor(_errors: { field: string; message: string }[]) {
    const errors = _errors.map(({ field, message }) => ({
      field,
      context: { label: field },
      message,
    }));

    super('MISSING_PARAMS', errors, errors);
  }
}
