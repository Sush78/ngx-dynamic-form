import { TestBed } from '@angular/core/testing';

import { NgxDynamicFormLibService } from './ngx-dynamic-form-lib.service';

describe('NgxDynamicFormLibService', () => {
  let service: NgxDynamicFormLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDynamicFormLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
