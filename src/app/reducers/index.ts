import * as fromChat from './chat-reducer';
import {createSelector} from 'reselect';

export interface State {
  messages: fromChat.State;
}

export const reducers = {
  chat: fromChat.reducer
};

// const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
// const productionReducer: ActionReducer<State> = combineReducers(reducers);

export const getMessagesState = (state: State) => state.messages;
// export const getCollectionState = (state: State) => state.collection;

export const getBookEntities = createSelector(getMessagesState, fromChat.getEntities);
/// export const getCollectionBookIds = createSelector(getCollectionState, fromCollection.getIds);
 export const getMessagesCollection = createSelector(getBookEntities, (entities) => {
  return entities;
});


/*
export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
*/
