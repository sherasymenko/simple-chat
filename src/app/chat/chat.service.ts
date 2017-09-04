import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {IMessage} from './message.model';

@Injectable()
export class ChatService {
  private _personUrl = 'assets/messages.json';

  constructor(private _http: Http) {
  }

  getMessages(): Observable<IMessage[]> {
    return this._http.get(this._personUrl)
      .map((response: Response) => <IMessage[]> response.json())
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
