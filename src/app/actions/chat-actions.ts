import {Message} from '../chat/message.model';
import {Action} from 'ngrx/@ngrx/store';

export const ADD_MESSAGE = 'Add Message';
export const SEARCH_MESSAGES = 'Seaarch Messages';
export const SEARCH_MESSAGES_COMPLETE = 'Seaarch Messages Complete';
export const ADD_MESSAGE_SUCCESS = 'Add Message Success';
export const ADD_MESSAGE_FAIL = 'Add Message Fail';
export const DO_ADD_MESSAGE = 'Do Add Message';


export class DoAddMessageAction implements Action {
  readonly type = DO_ADD_MESSAGE;
  constructor(public message: Message) {
  }
}
export class AddMessageAction implements Action {
  readonly type = ADD_MESSAGE;

  constructor(public message: Message) {
  }
}

export class SearchMessagesAction implements Action {
  readonly type = SEARCH_MESSAGES;

  constructor() {
  }
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_MESSAGES_COMPLETE;

  constructor(public messages: Message[]) {
  }
}

export class AddMessageSuccess implements Action {
  readonly type = ADD_MESSAGE_SUCCESS;

  constructor() {
  }
}

export class AddMessageFail implements Action {
  readonly type = ADD_MESSAGE_FAIL;

  constructor() {
}
}

export type Actions
  = AddMessageAction | SearchMessagesAction | SearchCompleteAction | AddMessageSuccess | AddMessageFail;
