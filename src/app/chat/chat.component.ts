import { Component } from '@angular/core';
import { Message } from './message.model';
import { ChatService } from './chat.service';
import { LoginService } from '../auth/login.service';
import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import { schema } from 'normalizr';
import map from 'lodash/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/first';
import * as _ from 'lodash';
import { AddCommentAction } from '../actions/main-actions';
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
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messageList: Message[];
messages$: Observable<Message[]>;
  constructor(private chatService: ChatService, private authService: LoginService,
              private appStore: Store<fromRoot.State>) {
    // this.messages$ = this.appStore.select(fromRoot.getEntitiesCollection);
    // .subscribe(data => {
    //   this.messageList = map(data['articles'], (_article) => _article);
    // });
  }

  addMessage(messageForm) {
    this.messages$
      .first()
      .subscribe((messageList) => {
        const nextId = _.maxBy(messageList, 'id').id + 1;
        const newMessage: Message = {
          id: nextId,
          text: messageForm.messageText,
          author: this.getLoggedUser().id,
          image: this.authService.loggedUser.gender === 'm' ? 'assets/img/boy.png' : 'assets/img/girl.png'
        };
        this.appStore.dispatch(new AddCommentAction(newMessage));
      });

  }

  getLoggedUser() {
    return this.authService.loggedUser;
  }
}
