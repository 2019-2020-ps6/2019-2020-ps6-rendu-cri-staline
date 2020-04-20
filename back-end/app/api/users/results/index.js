const { Router } = require('express')

const { Result } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')

const { filterResultsFromUser, getResultFromUser } = require('./manager')

const router = new Router({ mergeParams: true })


router.get('/:resultId', (req, res) => {
  try {
    const result = getResultFromUser(req.params.userId, req.params.resultId)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    manageAllErrors(res, err)
  }
})

router.get('/', (req, res) => {
  try {
    const results = filterResultsFromUser(req.params.userId)
    res.status(200).json(results)
  } catch (err) {
    console.log(err)
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const resultBody = {  userId:req.params.userId,...req.body}
    let result = Result.create(resultBody)
    res.status(201).json(result)
  } catch (err) {
    console.log(err)
    manageAllErrors(res, err)
  }
})


module.exports = router
