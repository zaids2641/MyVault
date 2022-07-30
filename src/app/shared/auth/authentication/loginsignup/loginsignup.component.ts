import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../authservice.service';

@Component({
  selector: 'app-loginsignup',
  templateUrl: './loginsignup.component.html',
  styleUrls: ['./loginsignup.component.scss'],
})
export class LoginsignupComponent implements OnInit {
  toggleContent!: string;

  constructor(private _auth: AuthserviceService) {}

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.toggleContent = 'signin';
  }

  toggle(filter: any) {
    if (!filter) {
      filter = 'signin';
    } else {
      filter = filter;
    }
    this.toggleContent = filter;
  }

  LogIn(formData: FormData | any) {
    this._auth.SignIn(formData['email'], formData['password']);
  }

  GoogleAuth() {
    this._auth
      .GoogleAuth()
      // .then((_success) => {})
      // .catch((err) => {
      //   err;
      // });
  }

  SignOut() {
    this._auth.SignOut();
  }

  passwordReset(email: any) {
    this._auth.ForgotPassword(email.value);
  }
}
