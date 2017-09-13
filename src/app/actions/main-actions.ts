import { Message } from '../chat/message.model';
import { Action } from 'ngrx/@ngrx/store';

export const ADD_COMMENT = 'Add comment';
export const ADD_COMMENT_SUCCESS = 'Add comment success';
export const SEARCH_COMMENTS_COMPLETE = 'Search messages';

export class AddCommentAction implements Action {
  readonly type = ADD_COMMENT;

  constructor(public payload: any) {
  }
}

export class AddCommentSuccess implements Action {
  readonly type = ADD_COMMENT_SUCCESS;

  constructor(public payload: any) {
  }
}

export class SearchCommentsAction implements Action {
  readonly type = SEARCH_COMMENTS_COMPLETE;

  constructor(public payload: any) {
  }
}

export type Actions
  = AddCommentAction | SearchCommentsAction | AddCommentSuccess;
