import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { normalize, schema } from 'normalizr';
import { Message } from './message.model';
import map from 'lodash/map';
const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
  commenter: user
});
const article = new schema.Entity('articles', {
  author: user,
  comments: [comment]
});

@Injectable()
export class ChatService {
  private _personUrl = 'assets/messages.json';

  constructor(private _http: Http, private appStore: Store<fromRoot.State>) {
  }

  getMessages(): Observable<any> {
    return this._http.get(this._personUrl)
      .map(res => {
        console.log('RES', res);
        return res.json();
      })
      .map(res => {
        console.log(' before normalized 1 ', res);
        const normalized: any = normalize(res, [article]);
        console.log('normalized 1 ', normalized);
        return {
          entities: normalized.entities,
          result: normalized.result
        };
      });
  }

  addMessage(newMessage): Observable<any> {
    console.log(' before normalized 2 ', newMessage);
    const normalized: any = normalize(newMessage, article);
    console.log('normalized 2 ', normalized);
    return Observable.of({
      entities: normalized.entities,
      result: normalized.result
    });
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
