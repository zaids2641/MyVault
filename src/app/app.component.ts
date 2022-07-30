import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthserviceService } from './shared/auth/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  getTitle!: string;

  constructor(
    private title: Title,
    private authService: AuthserviceService,
    ) {}

  userStatus = this.authService.userStatus;

  ngOnInit(): void {
  }
  
  getTabTitle(_getTitle: any) {
    return this.title.setTitle(this.getTitle + ' Vault');
  }
}
