import {IMessage} from '../chat/message.model';
import { Action } from 'ngrx/@ngrx/store';

export const ADD_MESSAGE = 'Add Message';
export const SEARCH_MESSAGES = 'Seaarch Messages';
export const SEARCH_MESSAGES_COMPLETE = 'Seaarch Messages Complete';

export class AddMessageAction implements Action {
  readonly type = ADD_MESSAGE;

  constructor(public message: IMessage) { }
}

export class SearchMessagesAction implements Action {
  readonly type = SEARCH_MESSAGES;

  constructor() { }
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_MESSAGES_COMPLETE;

  constructor(public messages: IMessage[]) { }
}

export type Actions
  = AddMessageAction | SearchMessagesAction | SearchCompleteAction;
