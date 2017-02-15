const chalk = require('chalk')
const _ = require('lodash')

function getObjectDiffKeys(obj1, obj2) {
    const diff = Object.keys(obj1).reduce((result, key) => {
        if (!obj2.hasOwnProperty(key)) {
            result.push(key);
        } else if (_.isEqual(obj1[key], obj2[key])) {
            const resultKeyIndex = result.indexOf(key);
            result.splice(resultKeyIndex, 1);
        }
        return result;
    }, Object.keys(obj2));

    return diff;
}

module.exports = store => next => action => {
	const prevState = Object.assign({}, store.getState());

  console.log(chalk.bold(`Dispatching`), `'${action.type}'`)

  let result = next(action)

  const nextState = Object.assign({}, store.getState());

  console.log(chalk.bold(`State Diff\n`), chalk.red(`- ${JSON.stringify(prevState)}\n`), chalk.green(`+ ${JSON.stringify(nextState)}`))
  return result
}
