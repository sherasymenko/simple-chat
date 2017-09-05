import * as fromChat from './chat-reducer';
import {createSelector} from 'reselect';

export interface State {
  chat: fromChat.State;
}

export const reducers = {
  chat: fromChat.reducer
};

export const getMessagesState = (state: State) => state.chat;

export const getBookEntities = createSelector(getMessagesState, fromChat.getEntities);
 export const getMessagesCollection = createSelector(getBookEntities, (entities) => {
  return entities;
});

