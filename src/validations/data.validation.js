const Joi = require("joi");

const limitDto = {
    limit:Joi.number()
  .integer()
  .positive()
  .messages({
    "number.base": "Limit must be a number",
    "number.integer": "Limit must be an integer",
    "number.positive": "Limit must be a positive number",
  })
}

const categoryDto = { 
category:Joi.string()
  .trim()
  .allow("", null) // Allow empty string or null for optional category
  .messages({
    "string.empty": "Category cannot be an empty field",
  })
}

const APIDTO = Joi.object({
    ...categoryDto,
    ...limitDto
})
module.exports = {
  APIDTO
};
