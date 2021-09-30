import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestoFormComponent } from './puesto-form.component';

describe('PuestoFormComponent', () => {
  let component: PuestoFormComponent;
  let fixture: ComponentFixture<PuestoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuestoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuestoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
