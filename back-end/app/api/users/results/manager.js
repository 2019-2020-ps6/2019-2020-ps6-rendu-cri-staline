const { Result, User } = require('../../../models')
const { buildQuizz } = require('../../themes/quizzes/manager')
const NotFoundError = require('../../../utils/errors/not-found-error')
/**
 * Results Manager.
 * This file contains all the logic needed to by the result routes.
 */

/**
 * Function buildResult.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param resultId
 */
const buildResult = (resultId) => {
  const result = Result.getById(resultId)
  const quiz = buildQuizz(result.quizId)
  return { ...result, quiz }
}

/**
 * filterResultsFromUser.
 * This function filters among the results to return only the result linked with the given userId.
 * @param userId
 */
const filterResultsFromUser = (userId) => {
  const results = Result.get()
  const resultsFromUser = results.filter((result) => result.userId === parseInt(userId, 10))
  const resultsFromUserBuild = []
  if (resultsFromUser !== undefined) {
    resultsFromUser.forEach((result) => {
      resultsFromUserBuild.push(buildResult(result.id))
    })
  }
  return resultsFromUserBuild
}

/**
 * getResultFromUser.
 * This function retrieves a result from a user. It will throw a not found exception if the userId is different from the one provided in parameter.
 * @param userId
 * @param resultId
 */
const getResultFromUser = (userId, resultId) => {
  // Check if quizId exists, if not it will throw a NotFoundError
  const user = User.getById(userId)
  const result = Result.getById(resultId)
  if (result.userId !== userId) throw new NotFoundError(`${result.label} id=${resultId} was not found for ${user.firstName} id=${user.id} : not found`)
  return buildResult(resultId)
}

module.exports = {
  filterResultsFromUser,
  getResultFromUser,
}
