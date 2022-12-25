import Joi from "joi";

export const POST_POST_VALIDATION = Joi.object({
  body: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
});

export const USER_LOGIN_VALIDATION = Joi.object({
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

export const USER_REGISTER_VALIDATION = Joi.object({
  body: Joi.object({
    username: Joi.string().alphanum().min(2).max(50).trim(true).required(),
    password: Joi.string().min(4).max(8).trim(true).required(),
    email: Joi.string().email().trim(true).required()
  }),
});

export const PUT_USER_VALIDATION = Joi.object({
  body: Joi.object({
    username: Joi.string().alphanum().min(2).max(50),
    email: Joi.string().email().trim(true),
  }),
});

export const DELETE_USER_VALIDATION = Joi.object({
  params: Joi.object({
    userId: Joi.number().required(),
  }),
});
