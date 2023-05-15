import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioPorProductoComponent } from './inventario-por-producto.component';

describe('InventarioPorProductoComponent', () => {
  let component: InventarioPorProductoComponent;
  let fixture: ComponentFixture<InventarioPorProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioPorProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioPorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
