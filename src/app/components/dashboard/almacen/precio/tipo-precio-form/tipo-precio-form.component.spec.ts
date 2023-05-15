import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPrecioFormComponent } from './tipo-precio-form.component';

describe('TipoPrecioFormComponent', () => {
  let component: TipoPrecioFormComponent;
  let fixture: ComponentFixture<TipoPrecioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPrecioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPrecioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
