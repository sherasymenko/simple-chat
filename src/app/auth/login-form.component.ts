import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {LoginService} from './login.service';
import {IUser} from './user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  error = false;

  constructor(public dialogRef: MdDialogRef<LoginFormComponent>, private authService: LoginService) {
  }

  verifyAndLogin(formValues) {
    this.authService.getPersons().subscribe();
    this.authService.getUser(formValues.userName).subscribe(data => {

      if (data.password === formValues.password) {
        this.error = false;
        this.dialogRef.close();
      } else {
        this.authService.loggedUser = null;
        this.error = true;
      }
    });
  }
}
