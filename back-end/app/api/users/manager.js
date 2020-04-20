const { User,Result } = require('../../models')
const { filterResultsFromUser } = require('./results/manager')

/**
 * Function buildUser.
 * This function aggregates the results from the database to build a user with all the data needed by the clients.
 * @param quizId
 */
const buildUser= (userId) => {
  const user = User.getById(userId)
  const results = filterResultsFromUser(user.id)
  return { ...user, results }
}

/**
 * Function buildUsers.
 * This function aggregates the results from the database to build entire users.
 */
const buildUsers = () => {
  const users = User.get()
  return users.map((user) => buildUser(user.id))
}

module.exports = {
  buildUser,
  buildUsers,
}
