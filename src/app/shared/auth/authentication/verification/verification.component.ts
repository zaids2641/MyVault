import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthserviceService } from '../../authservice.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  dataLoading: boolean = false;

  constructor(
    public _auth: AuthserviceService,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  reSendVerification() {
    this.dataLoading = true;
    return this._auth
      .SendVerificationMail()
      .then((success) => {
        this.dataLoading = false;
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
