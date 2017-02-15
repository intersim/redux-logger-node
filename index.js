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
  let result = next(action)
  const nextState = Object.assign({}, store.getState());

  const diffArr = getObjectDiffKeys(prevState, nextState);

  console.log(chalk.bold(`'${action.type}':`))
  diffArr.forEach(key => {
    console.log('  ' + chalk.bold(`${key}: `));
    console.log('    ' + chalk.red(`- ${JSON.stringify(prevState[key])}`))
    console.log('    ' + chalk.green(`+ ${JSON.stringify(nextState[key])}`))
  });

  return result
}
