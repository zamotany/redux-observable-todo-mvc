import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import todosReducer from './todos/reducer';
import { fetchTodos } from './todos/epics';
import visibilityFilter from './visibilityFilter/reducer';

export const epics = combineEpics(
  fetchTodos,
);

export const reducers = combineReducers({
  todos: todosReducer,
  visibilityFilter,
});
