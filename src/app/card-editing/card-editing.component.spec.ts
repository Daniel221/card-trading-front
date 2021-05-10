import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEditingComponent } from './card-editing.component';

describe('CardEditingComponent', () => {
  let component: CardEditingComponent;
  let fixture: ComponentFixture<CardEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardEditingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
