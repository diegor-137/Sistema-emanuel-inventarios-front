import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteReportViewComponent } from './cliente-report-view.component';

describe('ClienteReportViewComponent', () => {
  let component: ClienteReportViewComponent;
  let fixture: ComponentFixture<ClienteReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
