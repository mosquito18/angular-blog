import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDialogCardComponent } from './my-dialog-card.component';

describe('MyDialogCardComponent', () => {
  let component: MyDialogCardComponent;
  let fixture: ComponentFixture<MyDialogCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDialogCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDialogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
