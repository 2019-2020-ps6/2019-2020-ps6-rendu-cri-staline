const { Router } = require('express')

const { Quiz, Question, Answer } = require('../../../../models')
const manageAllErrors = require('../../../../utils/routes/error-management')
const AnswersRouter = require('./answers')
const { filterQuestionsFromQuizz, getTheQuestionFromQuiz, deleteQuestionAndAnswers } = require('./manager')

const router = new Router({ mergeParams: true })
router.use('/:questionId/answers', AnswersRouter)

router.get('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId)
    res.status(200).json(filterQuestionsFromQuizz(req.params.quizId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    const question = getTheQuestionFromQuiz(req.params.quizId, req.params.questionId)
    res.status(200).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/', (req, res) => {
  try {
    const question = filterQuestionsFromQuizz(req.params.quizId)
    res.status(200).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    const quizId = parseInt(req.params.quizId, 10)
    const questionBody = { label: req.body.label, quizId }
    let question = Question.create(questionBody)
    // If answers have been provided in the request, we create the answer and update the response to send.
    if (req.body.answers && req.body.answers.length > 0) {
      const answers = req.body.answers.map((answer) => Answer.create({ ...answer, questionId: question.id }))
      question = { ...question, answers }
    }
    // If image have been provided in the request, we add the image and update the response to send.
    if (req.body.image && req.body.image.length > 0) {
      const { image } = req.body
      question = { ...question, image }
    }
    res.status(201).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    const question = getTheQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const updatedQuestion = Question.update(req.params.questionId, { label: req.body.label, quizId: question.quizId })
    res.status(200).json(updatedQuestion)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    deleteQuestionAndAnswers(req.params.questionId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/', (req, res) => {
  try {
    // Check if the question id exists & if the question has the same quizId as the one provided in the url.
    const questions = filterQuestionsFromQuizz(req.params.quizId)
    Question.delete(req.params.questionId)
    questions.array.forEach((element) => {
      Question.delete(element)
    })
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})


module.exports = router
