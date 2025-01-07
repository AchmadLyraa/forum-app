import { Action } from './action';

const commentsReducer = (state = [], action) => {
  switch (Action) {
  case Action.ADD_COMMENT:
    return [...state, action.payload];
  default:
    return state;
  }
};

export default commentsReducer;