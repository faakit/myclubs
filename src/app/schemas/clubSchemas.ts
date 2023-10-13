import Joi from 'joi';

export const createClubSchema = Joi.object({
  user: {
    name: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(8).max(32).required(),
    password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
  },
  club: {
    name: Joi.string().max(255).required(),
  },
});
