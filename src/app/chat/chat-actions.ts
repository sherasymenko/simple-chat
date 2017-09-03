import {IMessage} from './message.model';
import {Action, ActionCreator} from 'redux';

export const ADD_MESSAGE = 'Add Message';

export interface AddMessageAction extends Action {
  message: IMessage;
}

export const addMessage: ActionCreator<AddMessageAction> =
  (messageArgs: IMessage): AddMessageAction => {
    const defaults = {
      text: '',
      author: '',
      image: '',
      name: ''
    };
    const message: IMessage = Object.assign({}, defaults, messageArgs);

    return {
      type: ADD_MESSAGE,
      message: message
    };
  };
