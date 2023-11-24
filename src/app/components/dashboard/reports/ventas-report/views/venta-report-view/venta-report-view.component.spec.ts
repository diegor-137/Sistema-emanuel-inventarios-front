import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaReportViewComponent } from './venta-report-view.component';

describe('VentaReportViewComponent', () => {
  let component: VentaReportViewComponent;
  let fixture: ComponentFixture<VentaReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
