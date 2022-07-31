import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {  AngularFirestoreModule } from "@angular/fire/compat/firestore/";
import { AngularFireStorageModule } from '@angular/fire/compat/storage/';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTreeModule} from '@angular/material/tree';
import {MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/header/header.component';
import { EmailComponent } from './components/vaulat/email/email.component';
import { WebComponent } from './components/vaulat/web/web.component';
import { CryptoComponent } from './components/vaulat/crypto/crypto.component';
import { OthersComponent } from './components/vaulat/others/others.component';
import { LoginsignupComponent } from './shared/auth/authentication/loginsignup/loginsignup.component';
import { VerificationComponent } from './shared/auth/authentication/verification/verification.component';
import { AccountverifiedComponent } from './shared/auth/authentication/accountverified/accountverified.component';
import { VaultappComponent } from './vaultapp/vaultapp.component';
import { MatRippleModule } from '@angular/material/core';
import { DialogComponent } from './components/dialog/newdatadialog/dialog.component';
import { VieweditdialogComponent } from './components/dialog/vieweditdialog/vieweditdialog.component';
import { EncrServiceService } from './shared/encr/encr-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DialogComponent,
    EmailComponent,
    WebComponent,
    CryptoComponent,
    OthersComponent,
    LoginsignupComponent,
    VerificationComponent,
    AccountverifiedComponent,
    VaultappComponent,
    VieweditdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSelectModule,
    MatExpansionModule,
    MatStepperModule,
    MatTreeModule,
    MatDividerModule,
    FlexLayoutModule,
    MatRippleModule,
    AngularFireModule.initializeApp(environment.firebase, 'myvault'),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    EncrServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
