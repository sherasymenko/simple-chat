import { Message } from '../chat/message.model';
import { Action } from 'ngrx/@ngrx/store';

export const ADD_COMMENT = 'Add comment';

export class AddCommentAction implements Action {
  readonly type = ADD_COMMENT;

  constructor(public payload: any) {
  }
}

export type Actions
  = AddCommentAction;
