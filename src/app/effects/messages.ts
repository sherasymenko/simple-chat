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

@Injectable()
export class MessageEffects {
  constructor(private actions$: Actions, private chatService: ChatService) {
  }

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(chat.SEARCH_MESSAGES)
    .switchMap(() => {
      return this.chatService.getMessages()
        .map(messsages => new chat.SearchCompleteAction(messsages))
        .catch(() => of(new chat.SearchCompleteAction([])));
    });

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType(chat.DO_ADD_MESSAGE)
    .switchMap(message => {
      console.log('TEST9', message);
      return this.chatService.addMessage(message)
        .map(m => new chat.AddMessageSuccess())
        .catch((err) => of(new chat.AddMessageFail()));
    });
}
