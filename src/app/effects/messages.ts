import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as chat from '../actions/chat-actions';
import {ChatService} from '../chat/chat.service';

@Injectable()
export class MessageEffects {
  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(chat.SEARCH_MESSAGES)
    .debounceTime(300)
    .map(toPayload)
    .switchMap(() => {
      const nextSearch$ = this.actions$.ofType(chat.SEARCH_MESSAGES).skip(1);
      // chatService.getMessages().subscribe(data => this.messageList = data);
      console.log('in effect');
      return this.chatService.getMessages()
        .takeUntil(nextSearch$)
        .map(messsages => new chat.SearchCompleteAction(messsages))
        .catch(() => of(new chat.SearchCompleteAction([])));
    });

  constructor(private actions$: Actions, private chatService: ChatService) { }
}
