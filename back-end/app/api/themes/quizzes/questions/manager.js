const { Quiz, Question, Answer } = require('../../../../models')
const NotFoundError = require('../../../../utils/errors/not-found-error')
const { filterAnswersFromQuestion } = require('./answers/manager')
/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

/**
 * filterQuestionsFromQuizz.
 * This function filters among the questions to return only the question linked with the given quizId.
 * @param quizId
 */
const filterQuestionsFromQuizz = (quizId) => {
  const questions = Question.get()
  const parsedId = parseInt(quizId, 10)
  return questions.filter((question) => question.quizId === parsedId)
}

/**
 * getQuestionFromQuiz.
 * This function retrieves a question from a quiz. It will throw a not found exception if the quizId in the question is different from the one provided in parameter.
 * @param quizId
 * @param questionId
 */
const getTheQuestionFromQuiz = (quizId, questionId) => {
  // Check if quizId exists, if not it will throw a NotFoundError
  const quiz = Quiz.getById(quizId)
  const quizIdInt = parseInt(quizId, 10)
  const question = Question.getById(questionId)
  if (question.quizId !== quizIdInt) {
    throw new NotFoundError(`${question.name} id=${questionId} was not found for ${quiz.name} id=${quiz.id} : not found`)
  }

  return question
}

/**
 * Supprimer une question et ses réponses.
 * @param questionId
 */
const deleteQuestionAndAnswers = (questionId) => {
  const question = Question.getById(questionId)
  const answers = filterAnswersFromQuestion(question.id)
  answers.forEach((answer) => {
    Answer.delete(answer.id)
  })
  Question.delete(questionId)
}

module.exports = {
  filterQuestionsFromQuizz,
  getTheQuestionFromQuiz,
  deleteQuestionAndAnswers,
}
