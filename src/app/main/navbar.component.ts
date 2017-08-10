import {Component} from '@angular/core';
import {MdDialog} from '@angular/material';
import {LoginFormComponent} from '../auth/login-form.component';
import {LoginService} from '../auth/login.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavigateBarComponent {
  constructor(public dialog: MdDialog, private _authService: LoginService, private _router: Router) {
  }

  openDialog() {
    let dialogRef = this.dialog.open(LoginFormComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logout() {
    this._router.navigate(['']);
    this._authService.loggedUser = null;
  }
}
