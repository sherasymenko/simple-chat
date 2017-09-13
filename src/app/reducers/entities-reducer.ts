import { Action } from 'ngrx/@ngrx/store';
import assign from 'lodash/assign';

export interface State {
  [schemaName: string]: {
    [id: string]: any
  };
}

export function reducer(state = {}, action: Action, entityType: string) {
  if (action && action.payload && action.payload.entities && action.payload.entities[entityType]) {
    return assign({}, {...state}, {...action.payload.entities[entityType]});
  } else {
    return state;
  }
}
