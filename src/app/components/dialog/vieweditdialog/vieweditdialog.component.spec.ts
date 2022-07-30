import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VieweditdialogComponent } from './vieweditdialog.component';

describe('VieweditdialogComponent', () => {
  let component: VieweditdialogComponent;
  let fixture: ComponentFixture<VieweditdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VieweditdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VieweditdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
