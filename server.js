const app = require('express')();
const { createStore, applyMiddleware } = require('redux');
const logger = require('./index');

const sayHello = () => ({ type: 'SAY_HELLO', message: "hello!" });

const sayGoodbye = () => ({ type: 'SAY_GOODBYE', message: "goodbye!" });

const moveLeft = () => ({ type: 'MOVE_LEFT', direction: "left" });

const moveRight = () => ({ type: 'MOVE_RIGHT', direction: "right" });

const reducer = (state = {message: null, direction: null}, action) => {
  switch (action.type) {
    case 'SAY_HELLO':
      return Object.assign({}, state, {message: action.message})

    case 'SAY_GOODBYE':
      return Object.assign({}, state, {message: action.message})

    case 'MOVE_LEFT':
      return Object.assign({}, state, {direction: action.direction})

    case 'MOVE_RIGHT':
      return Object.assign({}, state, {direction: action.direction})

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

app.get('/left', (req, res, next) => {
  store.dispatch(moveLeft());
  res.send(store.getState().direction);
});

app.get('/right', (req, res, next) => {
  store.dispatch(moveRight());
  res.send(store.getState().direction);
});

app.use((err, req, res, next) => console.log("Something went wrong...", err));

app.listen(3001, () => console.log("Listening on port 3001..."));
