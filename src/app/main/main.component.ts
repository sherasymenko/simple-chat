import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as chat from '../actions/chat-actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private router: Router, private appStore: Store<fromRoot.State>) {
  }

  navigateToChat() {
    this.searchOldMessages();
    this.router.navigate(['/chat']);
  }

  searchOldMessages() {
    this.appStore.dispatch(new chat.SearchMessagesAction());
  }
}
