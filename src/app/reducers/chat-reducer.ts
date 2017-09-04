import {IMessage} from '../chat/message.model';
import {
  ADD_MESSAGE, SEARCH_MESSAGES, AddMessageAction, SearchMessagesAction,
  SEARCH_MESSAGES_COMPLETE
} from '../actions/chat-actions';
import * as message from '../actions/chat-actions';

export interface State {
  messages: IMessage[];
}

export const initialState: State = {
  messages: []
};

export function reducer(state = initialState, action: message.Actions): State {
  switch (action.type) {
    case ADD_MESSAGE: {
      const message = (<AddMessageAction>action).message;
      console.log('test123' + message.text);
      return {
        ...state,
        text: message.text,
        author: message.author,
        image: message.image,
        name: message.name
      };
    }
    case SEARCH_MESSAGES: {
      // const message = (<SearchMessagesAction>action).message;
      console.log('SEARCH_MESSAGES');
      return {
        ...state
      };
    }
    case SEARCH_MESSAGES_COMPLETE: {
      const messages = action.messages;
      console.log('SEARCH_MESSAGES_COMPLETE ' + JSON.stringify(messages));
      return {
        ...state,
        messages
      };
    }
  }
}

export const getEntities = (state: State) => state.messages;

/*export const ChatReducer =
  function (state: IMessage = initialState, action: Action): IMessage {
    switch (action.type) {
      case ADD_MESSAGE: {
        const message = (<AddMessageAction>action).message;
        console.log('test123' + message.text);
        return {
          ...state,
          text: message.text,
          author: message.author,
          image: message.image,
          name: message.name
        };
      }
      default:
        return state;
    }
  };*/

/*
export const getThreadsState = (state): ThreadsState => state.threads;

export const getThreadsEntities = createSelector(
  getThreadsState,
  ( state: ThreadsState ) => state.entities );

export const getCurrentThread = createSelector(
);
*/
