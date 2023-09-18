import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoReportViewComponent } from './producto-report-view.component';

describe('ProductoReportViewComponent', () => {
  let component: ProductoReportViewComponent;
  let fixture: ComponentFixture<ProductoReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
