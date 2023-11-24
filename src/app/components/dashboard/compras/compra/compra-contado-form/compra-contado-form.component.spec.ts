import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraContadoFormComponent } from './compra-contado-form.component';

describe('CompraContadoFormComponent', () => {
  let component: CompraContadoFormComponent;
  let fixture: ComponentFixture<CompraContadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraContadoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraContadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
