import validator from 'cpf-cnpj-validator';
import Joi from 'joi';

const extendedJoi = Joi.extend(validator);

export const clientSignUpSchema = Joi.object({
  first_name: Joi.string().max(255).trim().required(),
  last_name: Joi.string().max(255).trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).trim().required(),
  password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
  cpf: extendedJoi.document().cpf().required(),
});

export const assignClientToClubSchema = Joi.object({
  client_id: Joi.number().required(),
  club_id: Joi.number().required(),
});
