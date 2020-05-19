const { Router } = require('express')

const { Result } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')

const { filterResultsFromUser, getResultFromUser } = require('./manager')

const router = new Router({ mergeParams: true })


router.get('/:resultId', (req, res) => {
  try {
    const result = getResultFromUser(parseInt(req.params.userId, 10), parseInt(req.params.resultId, 10))
    res.status(200).json(result)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/', (req, res) => {
  try {
    const results = filterResultsFromUser(parseInt(req.params.userId, 10))
    res.status(200).json(results)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const resultBody = { ...req.body }
    const result = Result.create(resultBody)
    res.status(201).json(result)
  } catch (err) {
    manageAllErrors(res, err)
  }
})


module.exports = router
