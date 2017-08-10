import {Component, OnInit} from '@angular/core';
import {IMessage} from './message.model';
import {ChatService} from './chat.service';
import {LoginService} from '../auth/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messageList: IMessage[];

  constructor(private _chatService: ChatService, private _authService: LoginService) {
    _chatService.getMessages().subscribe(data => this.messageList = data);
  }

  addMessage(messageForm) {
    let newMessage: IMessage = {
      text: messageForm.messageText,
      author: this.getLoggedUser(),
      image: this._authService.loggedUser.gender === 'm' ? 'assets/img/boy.png' : 'assets/img/girl.png',
      name: this._authService.loggedUser.firstName + ' ' + this._authService.loggedUser.lastName
    };
    this.messageList.push(newMessage);
  }

  getLoggedUser() {
    return this._authService.loggedUser.userName;
  }
}
