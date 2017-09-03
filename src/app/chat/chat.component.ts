import {Component, Inject, OnInit} from '@angular/core';
import {IMessage} from './message.model';
import {ChatService} from './chat.service';
import {LoginService} from '../auth/login.service';
import {addMessage} from './chat-actions';
import {AppStore} from '../main/app.store';
import {Store} from 'redux';
import {AppState} from '../main/app.reducer';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messageList: IMessage[];

  constructor(private _chatService: ChatService, private _authService: LoginService,
              @Inject(AppStore) private appStore: Store<AppState>) {
    _chatService.getMessages().subscribe(data => this.messageList = data);
  }

  addMessage(messageForm) {
    this.appStore.dispatch(addMessage(
      {
        text: messageForm.messageText,
        author: this.getLoggedUser(),
        image: this._authService.loggedUser.gender === 'm' ? 'assets/img/boy.png' : 'assets/img/girl.png',
        name: this._authService.loggedUser.firstName + ' ' + this._authService.loggedUser.lastName
      }
    ));

    /*let newMessage: IMessage = {
      text: messageForm.messageText,
      author: this.getLoggedUser(),
      image: this._authService.loggedUser.gender === 'm' ? 'assets/img/boy.png' : 'assets/img/girl.png',
      name: this._authService.loggedUser.firstName + ' ' + this._authService.loggedUser.lastName
    };
    this.messageList.push(newMessage);*/
  }

  getLoggedUser() {
    return this._authService.loggedUser.userName;
  }
}
