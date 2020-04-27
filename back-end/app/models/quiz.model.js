const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  themeId: Joi.number().required(),
  name: Joi.string().required(),
})
