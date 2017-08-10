import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ChatComponent} from './chat.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MaterialModule} from '@angular/material';
import {ChatService} from './chat.service';
import {ChatGuard} from './chat-guard.service';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    NoopAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: 'chat', canActivate: [ChatGuard], component: ChatComponent}])],
  declarations: [ChatComponent],
  providers: [ChatService, ChatGuard]
})
export class ChatModule {
}
