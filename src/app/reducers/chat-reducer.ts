import {Message} from '../chat/message.model';
import {
  ADD_MESSAGE, SEARCH_MESSAGES, AddMessageAction, SearchMessagesAction,
  SEARCH_MESSAGES_COMPLETE, ADD_MESSAGE_SUCCESS, ADD_MESSAGE_FAIL
} from '../actions/chat-actions';
import * as message from '../actions/chat-actions';

export interface State {
  chat: Message[];
}

export const initialState: State = {
  chat: []
};

export function reducer(state = initialState, action: message.Actions): State {
  switch (action.type) {
    case ADD_MESSAGE: {
      const message = (<AddMessageAction>action).message;
      console.log('ADD_MESSAGE ', message);
      return {
        chat: [...state.chat, message]
      };
    }
    case ADD_MESSAGE_SUCCESS: {
      console.log('ADD_MESSAGE_SUCCESS');
      return {
        ...state
      };
    }
    case ADD_MESSAGE_FAIL: {
      console.log('ADD_MESSAGE_FAIL');
      return {
        ...state
      };
    }
    case SEARCH_MESSAGES: {
      console.log('SEARCH_MESSAGES');
      return {
        ...state
      };
    }
    case SEARCH_MESSAGES_COMPLETE: {
      const messages = action.messages;
      console.log('SEARCH_MESSAGES_COMPLETE ' + JSON.stringify(messages));
      return {
        ...state.chat,
        chat: messages.map(message => message)
      };
    }
    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.chat;
