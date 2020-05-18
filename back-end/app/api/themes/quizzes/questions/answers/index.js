const { Router } = require('express')
const { Answer } = require('../../../../../models')

const { getQuestionFromQuiz } = require('../manager')
const { filterAnswersFromQuestion, getAnswerFromQuestion } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const answers = filterAnswersFromQuestion(question.id)
    res.status(200).json(answers)
  } catch (err) {
    console.log(err);
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.get('/:answerId', (req, res) => {
  try {
    const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId)
    res.status(200).json(answer)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      console.log(err);
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.post('/', (req, res) => {
  try {
    const answer = Answer.create({ ...req.body, questionId: parseInt(req.params.questionId, 10) })

    res.status(201).json(answer)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.put('/:answerId', (req, res) => {
  try {
    const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId)
    const updatedAnswer = Answer.update(req.params.answerId, { ...req.body, questionId: answer.questionId })
    res.status(200).json(updatedAnswer)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      console.log(err);
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:answerId', (req, res) => {
  try {
    Answer.delete(parseInt(req.params.answerId,10))
    res.status(204).end()
  } catch (err) {
    console.log(err);
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/', (req, res) => {
  try {
    const answers = filterAnswersFromQuestion(req.params.questionId)
    answers.array.forEach((answer) => {
      Answer.delete(answer)
    })
    res.status(204).end()
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router;
