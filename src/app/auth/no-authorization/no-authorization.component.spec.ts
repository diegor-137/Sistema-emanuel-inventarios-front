import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAuthorizationComponent } from './no-authorization.component';

describe('NoAuthorizationComponent', () => {
  let component: NoAuthorizationComponent;
  let fixture: ComponentFixture<NoAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
