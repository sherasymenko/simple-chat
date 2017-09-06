import { Action } from 'ngrx/@ngrx/store';
import assign from 'lodash/assign';

export interface State {
  [schemaName: string]: {
    [id: string]: any
  };
}

export function reducer(state = {}, action: Action): State {
  if (action && action.payload && action.payload.entities) {
    console.log('TEST1');
    return assign({}, {...state}, {...action.payload.entities});
  } else {
    return state;
  }
}
