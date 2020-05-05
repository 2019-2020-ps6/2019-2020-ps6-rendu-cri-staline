const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Result', {
  userId: Joi.number().required(),
  quizId: Joi.number().required(),
  answersId: Joi.array().required(),
  score: Joi.number(),
  date: Joi.string(),
  startingTime: Joi.string(),
  endTime: Joi.string(),
})
