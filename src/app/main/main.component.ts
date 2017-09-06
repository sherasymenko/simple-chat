import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as chat from '../actions/chat-actions';
import * as main from '../actions/main-actions';
import { Author } from './author.model';
import { MainService } from './main.service';
import { normalize, schema, Schema } from 'normalizr';
import { Observable } from 'rxjs/Observable';

const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
  commenter: user
});
const article = new schema.Entity('articles', {
  author: user,
  comments: [comment]
});

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  commentList: Comment[];
  authorList: Author[];
  showData$: Observable<any>;

  constructor(private router: Router, private appStore: Store<fromRoot.State>, private mainService: MainService) {
  }

  navigateToChat() {
    this.searchOldMessages();
    this.router.navigate(['/chat']);
  }

  searchOldMessages() {
    this.appStore.dispatch(new chat.SearchMessagesAction());
  }

  loadPage(pageNr) {

    /* this.appStore.select(fromRoot.getEntitiesCollection).map(d => {
       console.log('test5', d);
       return d;
     }).subscribe(d => {
       console.log('from component ', d);
     });*/

    /*this.mainService.getPageData(pageNr).subscribe(data => {
      this.appStore.dispatch(new main.AddCommentAction(normalize(data, new schema.Array(article))));
      /!*console.log('Page data before: ', data);
      // console.log('Page data after: ', new schema.Array({article}));
      console.log('Page data after: ', normalize(data, new schema.Array(article)));*!/

      this.showData$ = this.appStore.select(fromRoot.getEntitiesCollection);
    });*/
  }
}

/*export const getWniosekLista = createSelector(
  getWniosekListaIdsData,
  getEntitiesWnioski,
  getEntitiesUzytkownicy,
  getSlownikiState,
  (ids, wnioski, uzytkownicy, slowniki) => {
    let result = [];
    if (ids && ids.length) {
      result = ids.map(id => {
        const wniosek = wnioski[id];
        if (wniosek) {
          const uzytkownikId = _.get(wniosek, 'uzytkownik') as number;
          return _.merge({}, wniosek, {
            uzytkownik: UserUtil.getUserById(uzytkownikId, uzytkownicy, slowniki[SlownikiTypes.S172])
          }) as any;
        }
        return null;
      }) as WniosekType[];
    }
    return result;
  });*/

