import {Component} from '@angular/core';
import {IMessage} from './message.model';
import {ChatService} from './chat.service';
import {LoginService} from '../auth/login.service';
import {AddMessageAction} from '../actions/chat-actions';
import * as fromRoot from '../reducers';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as chat from '../actions/chat-actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messageList: IMessage[];
  messages$: Observable<IMessage[]>;
  constructor(private chatService: ChatService, private authService: LoginService,
              private appStore: Store<fromRoot.State>) {
   // this.appStore.dispatch(new chat.SearchMessagesAction());
    this.messages$ = appStore.select(fromRoot.getMessagesCollection);
    this.messages$.subscribe(data => {
      console.log('from component ' + JSON.stringify(data));
    });
    // chatService.getMessages().subscribe(data => this.messageList = data);

  }

  addMessage(messageForm) {
    this.appStore.dispatch(new AddMessageAction(
      {
        text: messageForm.messageText,
        author: this.getLoggedUser(),
        image: this.authService.loggedUser.gender === 'm' ? 'assets/img/boy.png' : 'assets/img/girl.png',
        name: this.authService.loggedUser.firstName + ' ' + this.authService.loggedUser.lastName
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
    return this.authService.loggedUser.userName;
  }
}
