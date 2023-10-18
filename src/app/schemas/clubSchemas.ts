import Joi from 'joi';

export const createClubSchema = Joi.object({
  user: {
    name: Joi.string().max(255).trim().required(),
    email: Joi.string().email().max(255).trim().required(),
    password: Joi.string().min(8).max(32).trim().required(),
    password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
  },
  club: {
    name: Joi.string().max(255).trim().required(),
  },
});

export const assignClientToClubSchema = Joi.object({
  client_id: Joi.number().required(),
  club_id: Joi.number().required(),
  card_number: Joi.string().max(255).trim().optional(),
});
