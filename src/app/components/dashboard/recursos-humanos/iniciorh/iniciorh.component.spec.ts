import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciorhComponent } from './iniciorh.component';

describe('IniciorhComponent', () => {
  let component: IniciorhComponent;
  let fixture: ComponentFixture<IniciorhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciorhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciorhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
