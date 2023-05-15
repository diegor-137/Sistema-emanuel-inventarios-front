import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPrecioListComponent } from './tipo-precio-list.component';

describe('TipoPrecioListComponent', () => {
  let component: TipoPrecioListComponent;
  let fixture: ComponentFixture<TipoPrecioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPrecioListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPrecioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
