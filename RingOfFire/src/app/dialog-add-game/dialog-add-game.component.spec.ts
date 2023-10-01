import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddGameComponent } from './dialog-add-game.component';

describe('DialogAddGameComponent', () => {
  let component: DialogAddGameComponent;
  let fixture: ComponentFixture<DialogAddGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddGameComponent]
    });
    fixture = TestBed.createComponent(DialogAddGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
