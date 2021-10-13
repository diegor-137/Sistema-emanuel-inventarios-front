import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioalmacenComponent } from './inicioalmacen.component';

describe('InicioalmacenComponent', () => {
  let component: InicioalmacenComponent;
  let fixture: ComponentFixture<InicioalmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioalmacenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioalmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
