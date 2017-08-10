import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {NavigateBarComponent} from './main/navbar.component';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {ChatModule} from './chat/chat.module';
import {LoginFormComponent} from './auth/login-form.component';
import {MdButtonModule, MdDialogModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoginService} from './auth/login.service';
import {MainComponent} from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigateBarComponent,
    LoginFormComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MdDialogModule,
    MdButtonModule,
    ChatModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'chat', loadChildren: './chat/chat.module#ChatModule'},
      {path: '', component: MainComponent}
    ])
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
  entryComponents: [LoginFormComponent]
})
export class AppModule {
}
