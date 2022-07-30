import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  vault = this.data;
  emailGroup!: FormGroup;
  webGroup!: FormGroup;
  cryptoGroup!: FormGroup;
  othersGroup!: FormGroup;

  error: boolean = false;
  errorMessage: any;
  savedChanges = false;
  dataLoading: boolean = false;
  formData: any;
  querySubscription!: Promise<void>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private _formBuilder: FormBuilder,
    private _services: ServiceService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  successDialog(_vault: any) {
   this.dialog.open(DialogComponent, {
    });
  }

  ngOnInit(): void {
    this.emailGroup = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      auth: [''],
      reg_number: [''],
      provider: [''],
      recovery_mode: [''],
      security_question: [''],
      security_answer: [''],
    });

    this.webGroup = this._formBuilder.group({
      email: ['', Validators.required],
      account_username: [''],
      site_name: [''],
      password: ['', Validators.required],
      user_id: [''],
      auth: [''],
      platform: [''],
      url: [''],
      reg_number: [''],
      recovery_mode: [''],
      security_question: [''],
      security_answer: [''],
    });

    this.cryptoGroup = this._formBuilder.group({
      email: ['', Validators.required],
      account_username: [''],
      site_name: [''],
      password: ['', Validators.required],
      user_id: [''],
      auth: [''],
      platform: [''],
      url: [''],
      reg_number: [''],
      transaction_password: [''],
      recovery_mode: [''],
      security_question: [''],
      security_answer: [''],
      privatekey: [''],
      token: [''],
      walletphrase: [''],
    });

    this.othersGroup = this._formBuilder.group({
      email: ['', Validators.required],
      account_username: [''],
      password: ['', Validators.required],
      user_id: [''],
      auth: [''],
      platform: [''],
      url: [''],
      reg_number: [''],
      recovery_mode: [''],
      security_question: [''],
      security_answer: [''],
      site_name: [''],
      site_password: [''],
      db_admin: [''],
      db_username: [''],
      db_name: [''],
      db_password: [''],
      db_manager: [''],
      website_url: [''],
      ftp_username: [''],
      ftp_password: [''],
      ftp_hostname: [''],
      ftp_port: [''],
      app_id: [''],
      application_app_id: [''],
      app_secret: [''],
      client_token: [''],
      access_token: [''],
    });
  }

  submit() {
    let vault = this.vault;
    if (vault == 'email' && this.emailGroup.valid) {
      const formData = {
        ...this.emailGroup.value,
      };
      this.dataLoading = true;
      this.querySubscription = this._services
        .setData(vault, formData)
        .then((data) => {
          // this.savedChanges = true;
          this.dialogRef.close();
          this.successDialog(vault = 'success');
          this.dataLoading = false;
        })
        .catch((error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        });
      this.emailGroup.reset();
    }

    if (this.vault == 'web' && this.webGroup.valid) {
      const formData = {
        ...this.webGroup.value,
      };
      this.dataLoading = true;
      this.querySubscription = this._services
        .setData(vault, formData)
        .then((data) => {
          // this.savedChanges = true;
          this.dialogRef.close();
          this.successDialog(vault = 'success');
          this.dataLoading = false;
        })
        .catch((error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        });
      this.webGroup.reset();
    }

    if (this.vault == 'crypto' && this.cryptoGroup.valid) {
      const formData = {
        ...this.cryptoGroup.value,
      };
      this.dataLoading = true;
      this.querySubscription = this._services
        .setData(vault, formData)
        .then((data) => {
          // this.savedChanges = true;
          this.dialogRef.close();
          this.successDialog(vault = 'success');
          this.dataLoading = false;
        })
        .catch((error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        });
      this.cryptoGroup.reset();
    }

    if (this.vault == 'others' && this.othersGroup.valid) {
      const formData = {
        ...this.othersGroup.value,
      };
      this.dataLoading = true;
      this.querySubscription = this._services
        .setData(vault, formData)
        .then((data) => {
          // this.savedChanges = true;
          this.dialogRef.close();
          this.successDialog(vault = 'success');
          this.dataLoading = false;
        })
        .catch((error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        });
      this.othersGroup.reset();
    }
  }
}
