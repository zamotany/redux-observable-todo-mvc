// Action for initial todos fetching
export const TODOS_FETCH_REQUEST = 'TODOS_FETCH_REUEST';
export const TODOS_FETCH_SUCCESS = 'TODOS_FETCH_SUCCESS';
export const TODOS_FETCH_FAILURE = 'TODOS_FETCH_FAILURE';

export const TODOS_ADD = 'TODOS_ADD';
export const TODOS_REMOVE = 'TODOS_REMOVE';
export const TODOS_EDIT = 'TODOS_EDIT';
export const TODOS_COMPLETE = 'TODOS_COMPLETE';
export const TODOS_COMPLETE_ALL = 'TODOS_COMPLETE_ALL';
export const TODOS_REMOVE_COMPLETED = 'TODOS_REMOVE_COMPLETED';

const initialState = {
  pending: false,
  error: null,
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TODOS_FETCH_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case TODOS_FETCH_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    case TODOS_FETCH_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case TODOS_ADD:
      return {
        ...state,
        data: [
          {
            id: state.data.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
            completed: false,
            text: action.text,
          },
          ...state.data,
        ],
      };
    case TODOS_REMOVE:
      return {
        ...state,
        data: state.data.filter(todo => todo.id !== action.id),
      };
    case TODOS_EDIT:
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, text: action.text };
          }
          return todo;
        }),
      };
    case TODOS_COMPLETE:
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }),
      };
    case TODOS_REMOVE_COMPLETED:
      return {
        ...state,
        data: state.data.filter(todo => !todo.completed),
      };
    default:
      return state;
  }
};


export const fetchTodos = () => ({ type: TODOS_FETCH_REQUEST });
export const addTodo = text => ({ type: TODOS_ADD, text });
export const deleteTodo = id => ({ type: TODOS_REMOVE, id });
export const editTodo = (id, text) => ({ type: TODOS_EDIT, id, text });
export const completeTodo = id => ({ type: TODOS_COMPLETE, id });
export const removeCompleted = () => ({ type: TODOS_REMOVE_COMPLETED });
