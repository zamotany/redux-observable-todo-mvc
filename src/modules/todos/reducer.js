import {
  TODOS_AJAX_FAILURE,
  TODOS_FETCH_REQUEST,
  TODOS_FETCH_SUCCESS,
  TODOS_ADD_REQUEST,
  TODOS_ADD_SUCCESS,
  TODOS_REMOVE_REQUEST,
  TODOS_REMOVE_SUCCESS,
  TODOS_COMPLETE_REQUEST,
  TODOS_COMPLETE_SUCCESS,
  TODOS_EDIT_REQUEST,
  TODOS_EDIT_SUCCESS,
  TODOS_REMOVE_COMPLETED_REQUEST,
  TODOS_REMOVE_COMPLETED_SUCCESS,
} from './actions';

const initialState = {
  pending: false,
  error: null,
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TODOS_AJAX_FAILURE:
      return {
        ...state,
        pending: false,
        error: {
          message: action.message,
          ajaxError: action.error,
        },
      };
    case TODOS_FETCH_REQUEST:
    case TODOS_ADD_REQUEST:
    case TODOS_REMOVE_REQUEST:
    case TODOS_COMPLETE_REQUEST:
    case TODOS_REMOVE_COMPLETED_REQUEST:
    case TODOS_EDIT_REQUEST:
      return {
        ...state,
        error: null,
        pending: true,
      };
    case TODOS_FETCH_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    case TODOS_ADD_SUCCESS:
      return {
        ...state,
        pending: false,
        data: [
          ...state.data,
          {
            id: action.id,
            completed: false,
            text: action.text,
          },
        ],
      };
    case TODOS_REMOVE_SUCCESS:
      return {
        ...state,
        pending: false,
        data: state.data.filter(todo => todo.id !== action.id),
      };
    case TODOS_COMPLETE_SUCCESS:
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }),
      };
    case TODOS_EDIT_SUCCESS:
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, text: action.text };
          }
          return todo;
        }),
      };
    case TODOS_REMOVE_COMPLETED_SUCCESS:
      return {
        ...state,
        data: state.data.filter(todo => !todo.completed),
      };
    default:
      return state;
  }
};

