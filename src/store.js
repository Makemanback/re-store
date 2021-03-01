import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const logMiddleware = (store) => (dispatch) => (action) => {
  console.log(action.type, store.getState())
  return dispatch(action);
}

const stringMiddleware = () => (dispatch) => (action) => {
  if (typeof action === `string`) {
    return dispatch({
      type: action
    });
  }

  return dispatch(action)
}

// const stringEnhanser = (createStore) => (...args) => {
//   const store = createStore(...args);
//   const originalDispatch = store.dispatch;
//   store.dispatch = (action) => {

//     if (typeof action === `string`) {
//       return originalDispatch({
//         type: action
//       });
//     }

//     return originalDispatch(action);
//   }

//   return store;
// }

// const logEnhanser = (createStore) => (...args) => {
//   const store = createStore(...args);
//   const originalDispatch = store.dispatch;
//   store.dispatch = (action) => {
//     console.log(action.type)
//     return originalDispatch(action);
//   }

//   return store;
// }

const store = createStore(reducer, applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware));

// const myAction = (dispatch) => {
//   setTimeout(() => dispatch({
//     type: `DELAYED_ACTION`
//   }), 1500)
// }

const delayedActionCreator = (timeout) => (dispatch) => {
  setTimeout(() => dispatch({
    type: `DELAYED_ACTION`
  }), timeout)
}

store.dispatch(delayedActionCreator(2000));
export default store;