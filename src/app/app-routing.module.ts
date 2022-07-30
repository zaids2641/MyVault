import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountverifiedComponent } from './shared/auth/authentication/accountverified/accountverified.component';
import { LoginsignupComponent } from './shared/auth/authentication/loginsignup/loginsignup.component';
import { VerificationComponent } from './shared/auth/authentication/verification/verification.component';
import { AdminauthguardGuard } from './shared/guard/adminauthguard.guard';
import { AuthguardGuard } from './shared/guard/authguard.guard';
import { VaultappComponent } from './vaultapp/vaultapp.component';

const routes: Routes = [
  {path:'',redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component:  LoginsignupComponent},
  { path: 'email-verification', component:  VerificationComponent, canActivate: [AuthguardGuard]},
  { path: 'verification-success', component:  AccountverifiedComponent, canActivate: [AuthguardGuard]},  
  { path: 'myvault', component:  VaultappComponent, canActivate: [AdminauthguardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
