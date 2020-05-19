const { Router } = require('express')
const ResultsRouter = require('./results')
const { User } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildUser, buildUsers } = require('./manager')

const router = new Router()

router.use('/:userId/results', ResultsRouter)

router.get('/', (req, res) => {
  try {
    res.status(200).json(buildUsers())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:userId', (req, res) => {
  try {
    const user = buildUser(req.params.userId)

    res.status(200).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const user = User.create({ ...req.body })
    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:userId', (req, res) => {
  try {
    res.status(200).json(User.update(req.params.userId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:userId', (req, res) => {
  try {
    User.delete(req.params.userId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
