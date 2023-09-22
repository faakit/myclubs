import Joi from 'joi';

interface ValidByEnum<T = string | number> {
  valid: T[];
  messages: Joi.LanguageMessages;
}
export const extractValidValuesByEnum = <T = string | number>(
  object: object,
  valids?: Array<string>,
): ValidByEnum<T> => {
  const filteredObject = valids?.length
    ? valids?.reduce((acc, valid) => {
        return { ...acc, [valid]: object[valid] };
      }, {})
    : object;

  const keys = Object.keys(filteredObject);
  const values = Object.values(filteredObject);

  let shouldSplice = true;
  for (let index = 0; index < keys.length / 2; index++) {
    if (!(keys[index] == values[index + keys.length / 2])) {
      shouldSplice = false;
      break;
    }
  }

  const valid = Array.from(Object.keys(filteredObject)).map(
    key => filteredObject[key],
  );

  const formattedValid = shouldSplice
    ? valid
        .splice(0, valid.length / 2)
        .map(key => `${filteredObject[key]} (${key})`)
        .join(', ')
    : valid.join(', ');

  const messages = {
    'any.only': `{{#label}} must be one of [${formattedValid}]`,
  };
  return { valid, messages };
};
