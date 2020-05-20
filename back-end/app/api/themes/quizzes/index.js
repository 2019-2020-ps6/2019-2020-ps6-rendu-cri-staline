const { Router } = require('express')

const { Quiz } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const QuestionsRouter = require('./questions')
const { buildQuizz, buildQuizzesByThemeId, deleteQuizAndQuestions } = require('./manager')


const router = new Router({ mergeParams: true })
router.use('/:quizId/questions', QuestionsRouter)


router.get('/', (req, res) => {
  try {
    const quizzes = buildQuizzesByThemeId(parseInt(req.params.themeId, 10))
    res.status(200).json(quizzes)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    const quizz = buildQuizz(req.params.quizId)
    res.status(200).json(quizz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body, themeId: parseInt(req.body.themeId, 10) })
    res.status(201).json(quiz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    if (req.body.themeId !== undefined) {
      req.body = { ...req.body, themeId: parseInt(req.params.themeId, 10) }
    }
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    deleteQuizAndQuestions(req.params.quizId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
