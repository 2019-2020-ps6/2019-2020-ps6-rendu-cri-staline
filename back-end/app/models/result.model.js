const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Result', {
    userId:Joi.string().required(),
  quizId: Joi.string().required(),
  score: Joi.number().required(),
  date:Joi.string(),
})
