import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { shareReplay } from 'rxjs/operators';
import { ServiceService } from 'src/app/shared/services/service.service';
import { DialogComponent } from '../newdatadialog/dialog.component';

@Component({
  selector: 'app-vieweditdialog',
  templateUrl: './vieweditdialog.component.html',
  styleUrls: ['./vieweditdialog.component.scss'],
})
export class VieweditdialogComponent implements OnInit {
  showAddContent = false;
  hideInput = false;
  toggleContent!: string;
  docId = this.data;
  dataLoading: boolean = false;
  errorMessage: any;
  error!: boolean;
  savedChanges!: boolean;
  vaultData: any;
  querySubscription: any;
  emailGroup!: FormGroup;
  webGroup!: FormGroup;
  cryptoGroup!: FormGroup;
  othersGroup!: FormGroup;
  vault = this.data;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _services: ServiceService,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  successDialog() {
   this.dialog.open(DialogComponent, {
    });
  }

  ngOnInit(): void {
    this.toggleContent = this.data.type;
    this.emailGroup = this._formBuilder.group({
      _id: ['', Validators.required],
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
      _id: ['', Validators.required],
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
      _id: ['', Validators.required],
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
      _id: ['', Validators.required],
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

    this.querySubscription = this._services
      .getSingleVault(this.data.type, this.data.docId)
      .pipe(shareReplay());
    this.querySubscription.subscribe(
      (data: any) => {
        this.vaultData = data;
        if (!this.vaultData) return;
      },
      (error: any) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.error = false;
        this.dataLoading = false;
      }
    );
  }

  toggle(filter: any) {
    if (!filter) {
      filter = this.data.type;
    } else {
      filter = filter;
    }
    this.toggleContent = filter;
  }

  showContent() {
    if (!this.showAddContent) {
      this.showAddContent = true;
    } else {
      this.showAddContent = false;
    }
  }

  updateData() {
    let vault = this.data.type;
    if (vault == 'email' && this.emailGroup.valid) {
      const formData = {
        ...this.emailGroup.value,
      };
      this.dataLoading = true;
      this.querySubscription = this._services
        .updateVault('email', formData)
        .then((data) => {
          this.savedChanges = true;
          this.dialogRef.close();
          this.successDialog();
          this.dataLoading = false;
        })
        .catch((error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        });
      this.emailGroup.reset();
    }

    if (vault == 'web' && this.webGroup.valid) {
      const formData = {
        ...this.webGroup.value,
      };
      this.dataLoading = true;
      this.querySubscription = this._services
        .updateVault('web', formData)
        .then((data) => {
          this.savedChanges = true;
          this.dialogRef.close();
          this.successDialog();
          this.dataLoading = false;
        })
        .catch((error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        });
      this.webGroup.reset();
    }

    if (vault == 'crypto' && this.cryptoGroup.valid) {
      const formData = {
        ...this.cryptoGroup.value,
      };
      this.dataLoading = true;
      this.querySubscription = this._services
        .updateVault('crypto', formData)
        .then((data) => {
          this.savedChanges = true;
          this.dialogRef.close();
          this.successDialog();
          this.dataLoading = false;
        })
        .catch((error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        });
      this.cryptoGroup.reset();
    }

    if (vault == 'others' && this.othersGroup.valid) {
      const formData = {
        ...this.othersGroup.value,
      };
      this.dataLoading = true;
      this.querySubscription = this._services
        .updateVault('others', formData)
        .then((data) => {
          this.savedChanges = true;
          this.dialogRef.close();
          this.successDialog();
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
