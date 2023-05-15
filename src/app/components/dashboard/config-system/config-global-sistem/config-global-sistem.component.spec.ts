import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGlobalSistemComponent } from './config-global-sistem.component';

describe('ConfigGlobalSistemComponent', () => {
  let component: ConfigGlobalSistemComponent;
  let fixture: ComponentFixture<ConfigGlobalSistemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigGlobalSistemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGlobalSistemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
