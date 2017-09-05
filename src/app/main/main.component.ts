import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as chat from '../actions/chat-actions';
import { Author } from './author.model';
import { MainService } from './main.service';
import { normalize, schema, Schema } from 'normalizr';

const user = new schema.Entity('users');

const comment = new schema.Entity('comments', {
  commenter: user
});

const article = new schema.Entity('articles', {
  author: user,
  comments: [ comment ]
});

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  commentList: Comment[];
  authorList: Author[];

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
    this.mainService.getPageData(pageNr).subscribe(data => {
      console.log('Page data before: ', JSON.stringify(data));
      console.log('Page data after: ', JSON.stringify(normalize(data, article)));
      return data;
    });
  }
}
