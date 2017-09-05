import {Component} from '@angular/core';
import {Message} from './message.model';
import {ChatService} from './chat.service';
import {LoginService} from '../auth/login.service';
import {AddMessageAction, DoAddMessageAction} from '../actions/chat-actions';
import * as fromRoot from '../reducers';
import {Store} from '@ngrx/store';

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
      console.log('from component ' + JSON.stringify(data));
    });
  }

  addMessage(messageForm) {
    const newMessage: Message = {
      text: messageForm.messageText,
      author: this.getLoggedUser(),
      image: this.authService.loggedUser.gender === 'm' ? 'assets/img/boy.png' : 'assets/img/girl.png',
      name: this.authService.loggedUser.firstName + ' ' + this.authService.loggedUser.lastName
    };
    this.appStore.dispatch(new DoAddMessageAction(newMessage));
   // this.appStore.dispatch(new AddMessageAction(newMessage));
  }

  getLoggedUser() {
    return this.authService.loggedUser.userName;
  }
}
