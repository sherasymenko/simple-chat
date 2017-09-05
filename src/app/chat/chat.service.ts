import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Message } from './message.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { AddMessageAction } from '../actions/chat-actions';


@Injectable()
export class ChatService {
  private _personUrl = 'assets/messages.json';

  constructor(private _http: Http, private appStore: Store<fromRoot.State>) {
  }

  getMessages(): Observable<Message[]> {
    return this._http.get(this._personUrl)
      .map((response: Response) => <Message[]> response.json())
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  addMessage(newMessage): Observable<any> {
   /*  return this._http.post('...', newMessage)
       .map(res => res.json());*/
    this.appStore.dispatch(new AddMessageAction(newMessage.message));
    if (newMessage.message.text === '') {
      return Observable.throw('Server error');
    }
    console.log('from service', newMessage.message);
    return Observable.of(newMessage.message);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
