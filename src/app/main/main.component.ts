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

    let test = null;
    console.log('1. ', test > 0); // false
    console.log('2. ', test == 0); // false
    console.log('3. ', test <= 0); // true
  }

  navigateToChat() {
    this.searchOldMessages();
    this.router.navigate(['/chat']);
  }

  searchOldMessages() {
    this.appStore.dispatch(new chat.SearchMessagesAction());
  }

}

