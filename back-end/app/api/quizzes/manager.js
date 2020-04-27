const { Quiz } = require('../../models')
const { filterQuestionsFromQuizz } = require('./questions/manager')
const { filterAnswersFromQuestion } = require('./questions/answers/manager')
const {buildTheme } = require('../themes/manager')

/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildQuizz = (quizId) => {
  const quiz = Quiz.getById(quizId)
  const questions = filterQuestionsFromQuizz(quiz.id)
  const theme=buildTheme(quiz.themeId)
  const questionWithAnswers = questions.map((question) => {
    const answers = filterAnswersFromQuestion(question.id)
    return { ...question, answers }
  })
  return { ...quiz,theme :theme, questions: questionWithAnswers }
}

const buildQuizzesByThemeId=(themeId)=>{
  const quizzes= buildQuizzes();
  return quizzes.filter( (quiz)=> quiz.themeId===themeId);
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildQuizzes = () => {
  const quizzes = Quiz.get()
  return quizzes.map((quiz) => buildQuizz(quiz.id))
}

const deleteQuizzesOfTheme =(themeId)=>{
  const quizzes=buildQuizzesByThemeId(themeId);
  quizzes.forEach((quiz)=>Quiz.delete(quiz.id))
}

module.exports = {
  buildQuizz,
  buildQuizzes,
  buildQuizzesByThemeId,
  deleteQuizzesOfTheme,
}
