import { ValidationError, ValidationErrorItem } from 'joi';

export class FieldValidationError extends ValidationError {
  constructor(_errors: { field: string; message: string }[]) {
    const errors: ValidationErrorItem[] = _errors.map(({ field, message }) => ({
      field,
      context: { label: field },
      message,
      path: [field],
      type: 'any',
    }));

    super('MISSING_PARAMS', errors, errors);
  }
}
