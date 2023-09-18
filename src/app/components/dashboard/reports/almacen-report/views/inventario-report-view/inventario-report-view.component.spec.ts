import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioReportViewComponent } from './inventario-report-view.component';

describe('InventarioReportViewComponent', () => {
  let component: InventarioReportViewComponent;
  let fixture: ComponentFixture<InventarioReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
