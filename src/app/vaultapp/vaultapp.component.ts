import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../components/dialog/newdatadialog/dialog.component';
import { EventEmitterService } from '../shared/services/event-emitter.service';

@Component({
  selector: 'app-vaultapp',
  templateUrl: './vaultapp.component.html',
  styleUrls: ['./vaultapp.component.scss'],
})
export class VaultappComponent implements OnInit {
  eventSubscription!: Subscription;
  getTitle!: string;

  @Output() type: any;

  constructor(
    private title: Title,
    public dialog: MatDialog,
    private eventEmitter: EventEmitterService
  ) {
    this.eventSubscription = this.eventEmitter.getClickEvent().subscribe(() => {
      this.openDialog();
    });
  }

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      height: '90%',
      width: '60%',
    });
  }

  getTabTitle(_getTitle: any) {
    return this.title.setTitle(this.getTitle + ' Vault');
  }
}
