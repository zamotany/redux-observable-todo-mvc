import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import todosReducer from './todos/reducer';
import todosEpic from './todos/epics';
import visibilityFilter from './visibilityFilter/reducer';


export const epics = combineEpics(
  todosEpic,
);

export const reducers = combineReducers({
  todos: todosReducer,
  visibilityFilter,
});
