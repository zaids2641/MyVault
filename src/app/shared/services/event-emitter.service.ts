import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventEmitterService {
  private subject = new Subject<any>();

  constructor() { }

  triggerSuccess() {
    this.subject.next();
  }

  getClickEvent():Observable<any> {
    return this.subject.asObservable()
  }

  // Component
  // openDoc(_viewVault: any) {
  //   this.eventEmitter.sendClickEvent();
  // }
}
