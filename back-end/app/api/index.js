const { Router } = require('express')
const UserRouter = require('./users')
const ThemeRouter = require('./themes')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/users', UserRouter)
router.use('/themes', ThemeRouter)
module.exports = router
