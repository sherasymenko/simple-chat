import * as fromChat from './chat-reducer';
import * as fromEntities from './entities-reducer';
import { createSelector } from 'reselect';
import { Message } from '../chat/message.model';

export interface State {
  chat: fromChat.State;
  entities: fromEntities.State;
}

export const reducers = {
  chat: fromChat.reducer,
  entities: fromEntities.reducer
};

export const getMessagesState = (state: State) => state.chat;
export const getBookEntities = createSelector(getMessagesState, fromChat.getEntities);
export const getMessagesCollection = createSelector(getBookEntities, (entities) => {
  return entities;
});


export const getResultState = (state: State) => state.entities;
export const getResultsCollection = createSelector(getResultState, (results) => {
  return results;
});

export const getEntitiesState = (state: State) => state.entities;
// export const getEntities = createSelector(getEntitiesState, fromEntities.getEntities);
export const getEntitiesCollection = createSelector(getEntitiesState, getResultState, (entities, results) => {
  console.log('getEntitiesCollection results ', results);
  console.log('getEntitiesCollection entities ', entities);
  let r  = [];
  /*r = results.map(d => {
    const article = entities['articles'][d];
    if (article) {
      return article;
    }
    return null;
  });
  return r;*/
 return entities as Message[];
});

/*export const getWniosekLista = createSelector(
  getWniosekListaIdsData,
  getEntitiesWnioski,
  getEntitiesUzytkownicy,
  getSlownikiState,
  (ids, wnioski, uzytkownicy, slowniki) => {
    let result = [];
    if (ids && ids.length) {
      result = ids.map(id => {
        const wniosek = wnioski[id];
        if (wniosek) {
          const uzytkownikId = _.get(wniosek, 'uzytkownik') as number;
          return _.merge({}, wniosek, {
            uzytkownik: UserUtil.getUserById(uzytkownikId, uzytkownicy, slowniki[SlownikiTypes.S172])
          }) as any;
        }
        return null;
      }) as WniosekType[];
    }
    return result;
  });*/

