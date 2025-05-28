const Joi = require("joi");

const signInSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(30)
    .required()
    .email({ tlds: { allow: ["com", "net"] } }),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]+$")),
});

const signUpSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(30)
    .required()
    .email({ tlds: { allow: ["com", "net"] } }),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]+$")),
});

module.exports = {
  signInSchema,
  signUpSchema,
};