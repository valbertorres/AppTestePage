import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LembraSenhaComponent } from './lembra-senha.component';

describe('LembraSenhaComponent', () => {
  let component: LembraSenhaComponent;
  let fixture: ComponentFixture<LembraSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LembraSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LembraSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
