import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformCardComponent } from './inform-card.component';

describe('InformCardComponent', () => {
  let component: InformCardComponent;
  let fixture: ComponentFixture<InformCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
