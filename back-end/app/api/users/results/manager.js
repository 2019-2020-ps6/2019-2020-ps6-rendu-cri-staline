const { Result, User } = require('../../../models')
const NotFoundError = require('../../../utils/errors/not-found-error')
/**
 * Results Manager.
 * This file contains all the logic needed to by the result routes.
 */

/**
 * filterResultsFromQuizz.
 * This function filters among the results to return only the result linked with the given userId.
 * @param userId
 */
const filterResultsFromUser = (userId) => {
  const results = Result.get()
  const parsedId = parseInt(userId, 10)
  return results.filter((result) => parseInt(result.userId, 10) === parsedId)
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
  return result
}

module.exports = {
  filterResultsFromUser,
  getResultFromUser,
}
