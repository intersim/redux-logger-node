const app = require('express')();
const { createStore, applyMiddleware } = require('redux');
const logger = require('./index');

const sayHello = () => ({ type: 'SAY_HELLO', message: "Hello!" });

const sayGoodbye = () => ({ type: 'SAY_GOODBYE', message: "Goodbye!" });

const reducer = (state = {message: null}, action) => {
  switch (action.type) {
    case 'SAY_HELLO':
      return Object.assign({}, {message: action.message})

    case 'SAY_GOODBYE':
      return Object.assign({}, {message: action.message})

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(logger));

app.get('/hello', (req, res, next) => {
  store.dispatch(sayHello());
  res.send(store.getState().message);
});

app.get('/goodbye', (req, res, next) => {
  store.dispatch(sayGoodbye());
  res.send(store.getState().message);
});

app.use((err, req, res, next) => console.log("Something went wrong...", err));

app.listen(3001, () => console.log("Listening on port 3001..."));
