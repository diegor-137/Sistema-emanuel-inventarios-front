import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorReportViewComponent } from './proveedor-report-view.component';

describe('ProveedorReportViewComponent', () => {
  let component: ProveedorReportViewComponent;
  let fixture: ComponentFixture<ProveedorReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
