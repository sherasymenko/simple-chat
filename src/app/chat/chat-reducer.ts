import {Action} from 'redux';
import {IMessage} from './message.model';
import {ADD_MESSAGE, AddMessageAction} from './chat-actions';

const initialState: IMessage = {
  text: '',
  author: '',
  image: '',
  name: ''
};

export const ChatReducer =
  function (state: IMessage = initialState, action: Action): IMessage {
    switch (action.type) {
      case ADD_MESSAGE: {
        const message = (<AddMessageAction>action).message;
        console.log('test123' + message.text);
        return {
          text: message.text,
          author: message.author,
          image: message.image,
          name: message.name
        };
      }
      default:
        return state;
    }
  };
