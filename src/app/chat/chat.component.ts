import { Component } from '@angular/core';
import { Message } from './message.model';
import { ChatService } from './chat.service';
import { LoginService } from '../auth/login.service';
import { AddMessageAction, DoAddMessageAction } from '../actions/chat-actions';
import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { normalize, schema, Schema } from 'normalizr';
import * as main from '../actions/main-actions';

const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
  commenter: user
});
const article = new schema.Entity('articles', {
  author: user,
  comments: [comment]
});

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messageList: Message[];

  constructor(private chatService: ChatService, private authService: LoginService,
              private appStore: Store<fromRoot.State>) {
    this.appStore.select(fromRoot.getMessagesCollection).subscribe(data => {

      this.messageList = data;
      this.appStore.select(fromRoot.getEntitiesCollection).subscribe(d => {
        console.log('from chat component 2', d);
        if (d) {
          d['articles'].map(c => {
            console.log('comment', c);
          });
        }
      });
    });
    this.appStore.dispatch(new main.AddCommentAction(normalize(data, new schema.Array(article))));

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

    /*
        this.mainService.getPageData(pageNr).subscribe(data => {
          this.appStore.dispatch(new main.AddCommentAction(normalize(data, new schema.Array(article))));
          /!*console.log('Page data before: ', data);
          // console.log('Page data after: ', new schema.Array({article}));
          console.log('Page data after: ', normalize(data, new schema.Array(article)));*!/

          this.showData$ = this.appStore.select(fromRoot.getEntitiesCollection);
        });*/
  }

  addMessage(messageForm) {
    /*  const newMessage: Message = {
        text: messageForm.messageText,
        author: this.getLoggedUser(),
        image: this.authService.loggedUser.gender === 'm' ? 'assets/img/boy.png' : 'assets/img/girl.png',
        name: this.authService.loggedUser.firstName + ' ' + this.authService.loggedUser.lastName
      };
      this.appStore.dispatch(new DoAddMessageAction(newMessage));*/
    // this.appStore.dispatch(new AddMessageAction(newMessage));
  }

  getLoggedUser() {
    return this.authService.loggedUser.userName;
  }
}
