const Joi = require('joi');

const signupValidation = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .required()
});

const signinValidation = Joi.object({
    email: Joi.string()
        .email(),
    username: Joi.string()
        .alphanum(),
    password: Joi.string()
        .required()
}).xor('email', 'username'); // Requires either email OR username, but not both

module.exports = {
    signupValidation,
    signinValidation
};
