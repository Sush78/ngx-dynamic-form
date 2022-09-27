import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDynamicFormLibComponent } from './ngx-dynamic-form-lib.component';

describe('NgxDynamicFormLibComponent', () => {
  let component: NgxDynamicFormLibComponent;
  let fixture: ComponentFixture<NgxDynamicFormLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDynamicFormLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxDynamicFormLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
