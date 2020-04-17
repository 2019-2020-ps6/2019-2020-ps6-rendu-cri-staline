const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Theme', {
    themeName: Joi.string().required(),
    themeImage: Joi.string().allow(''),
  })


 