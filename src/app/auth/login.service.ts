import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {IUser} from './user.model';

@Injectable()
export class LoginService {
  personUrl = 'assets/users.json';
  error = false;
  loggedUser: IUser;

  constructor(private _http: Http) {
  }

  getPersons(): Observable<IUser[]> {
    return this._http.get(this.personUrl)
      .map((response: Response) => <IUser[]> response.json())
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getUser(username: string): Observable<IUser> {
    return this.getPersons()
      .map((persons: IUser[]) => persons.find(p => p.userName === username))
      .catch(this.handleError).do(user => this.loggedUser = user);
  }

  private handleError(error: Response) {
    this.error = true;
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  isAuthenticated() {
    return this.loggedUser;
  }
}
