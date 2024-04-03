const Joi = require("joi");
const emailDto = {
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .required()
    .messages({
      "string.email": `Email should be a valid mail format.`,
      "string.empty": `Email cannot be an empty field.`,
      "any.required": `Email is a required field, I'm sorry but there's nothing I can do about that.`,
    }),
};
const passwordDto = {
  password: Joi.string()
    .trim()
    .min(6)
    .required()
    .messages({
      "string.base": `Password should be a valid format.`,
      "string.empty": `Password cannot be an empty field.`,
      "string.min": `Password should be at least 6 characters long.`,
      "any.required": `Password is a required field, and I think that is understandable.`,
    }),
};

const registerDto = Joi.object({
  ...emailDto,
  ...passwordDto,
  full_name: Joi.string().optional(),
});


const loginDto = Joi.object({
  ...emailDto,
  ...passwordDto,
});

const tokenDto = Joi.object({
    token: Joi.string().required().messages({
      "string.empty": `token is cannot be empty`,
      "any.required": `token is required`,
    }),
  })

module.exports = {
  registerDto,
  loginDto,
  tokenDto
};
