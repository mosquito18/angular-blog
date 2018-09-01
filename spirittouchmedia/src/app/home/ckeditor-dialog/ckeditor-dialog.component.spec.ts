import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeditorDialogComponent } from './ckeditor-dialog.component';

describe('CkeditorDialogComponent', () => {
  let component: CkeditorDialogComponent;
  let fixture: ComponentFixture<CkeditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkeditorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkeditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
