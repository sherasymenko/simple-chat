import * as fromChat from './chat-reducer';
import * as fromEntities from './entities-reducer';
import { createSelector } from 'reselect';
import { Message } from '../chat/message.model';
import * as _ from 'lodash';

export interface State {
  chat: fromChat.State;
  entities: fromEntities.State;
}

export const reducers = {
  chat: fromChat.reducer,
/*  entities: (state, action) => {
    return {
      articles: fromEntities.reducer(state['articles'], action, 'articles'),
      users: fromEntities.reducer(state, action, 'users')
    };
  }*/
};

export const getMessagesState = (state: State) => state.chat;
export const getMessageEntities = createSelector(getMessagesState, fromChat.getEntities);
export const getMessagesCollection = createSelector(getMessageEntities, (entities) => {
  return entities;
});

export const getResultState = (state: State) => state.entities;
export const getResultsCollection = createSelector(getResultState, (results) => {
  return results;
});

export const getEntitiesState = (state: State) => state.entities;
// export const getEntities = createSelector(getEntitiesState, fromEntities.getEntities);
export const getEntitiesCollection = createSelector(getEntitiesState, getResultState, (entities, results) => {
  // console.log('getEntitiesCollection results ', results);
  // console.log('getEntitiesCollection entities ', entities);
  // let r  = [];
  // r = entities. as Message[];
  /*if (entities && entities['articles']) {
    return _.map(entities['articles'], (_article) => _article) as Message[];
  } else {
    return [];
  }*/
  // return entities as Message[];
  // return entities;
});
