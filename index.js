const chalk = require('chalk')

module.exports = store => next => action => {
  console.log(chalk.blue('prev state:', JSON.stringify(store.getState())))

  console.log('dispatching:', action)

  let result = next(action)

  console.log(chalk.red('next state:', JSON.stringify(store.getState())))
  return result
}
