import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';

import {
  TODOS_FETCH_REQUEST,
  TODOS_FETCH_SUCCESS,
  TODOS_FETCH_FAILURE,
} from './reducer';

export const fetchTodos = action$ =>
  action$.ofType(TODOS_FETCH_REQUEST)
    .mergeMap(() =>
      ajax.getJSON('http://localhost:3001/todos')
        .delay(500)
        .map(response => ({ type: TODOS_FETCH_SUCCESS, payload: response }))
        .catch(error => Observable.of({
          type: TODOS_FETCH_FAILURE,
          error,
        })),
    );
