import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MainService {
  private page1Url = 'assets/pages/page1.json';
  private page2Url = 'assets/pages/page2.json';
  private page3Url = 'assets/pages/page3.json';

  constructor(private http: Http) {
  }

  getPageData(pageNr): Observable<any> {
    let url = '';
    switch (pageNr) {
      case 1:
        url = this.page1Url;
        break;
      case 2:
        url = this.page2Url;
        break;
      case 3:
        url = this.page3Url;
        break;
    }
    return this.http.get(url)
      .map((response: Response) => response.json())
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
