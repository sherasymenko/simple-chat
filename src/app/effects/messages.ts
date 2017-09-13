import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import {Injectable} from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import * as chat from '../actions/chat-actions';
import {ChatService} from '../chat/chat.service';
import {empty} from 'rxjs/observable/empty';
import * as main from '../actions/main-actions';
import { AddCommentAction } from '../actions/main-actions';

@Injectable()
export class MessageEffects {
  constructor(private actions$: Actions, private chatService: ChatService) {
  }

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(chat.SEARCH_MESSAGES)
    .switchMap(() => {
      return this.chatService.getMessages()
        .map(messages => {
          return new main.SearchCommentsAction(messages);
        })
        .catch(() => of(new main.SearchCommentsAction([])));
    });

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType(main.ADD_COMMENT)
    .map((m: AddCommentAction) => m.payload)
    .switchMap(message => {
      return this.chatService.addMessage(message)
        .map(scopeMessage => new main.AddCommentSuccess(scopeMessage))
        .catch((err) => of(new chat.AddMessageFail()));
    });
}
