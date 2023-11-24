import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraReportViewComponent } from './compra-report-view.component';

describe('CompraReportViewComponent', () => {
  let component: CompraReportViewComponent;
  let fixture: ComponentFixture<CompraReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
