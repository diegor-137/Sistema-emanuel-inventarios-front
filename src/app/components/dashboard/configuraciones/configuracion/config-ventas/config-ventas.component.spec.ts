import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigVentasComponent } from './config-ventas.component';

describe('ConfigVentasComponent', () => {
  let component: ConfigVentasComponent;
  let fixture: ComponentFixture<ConfigVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigVentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
