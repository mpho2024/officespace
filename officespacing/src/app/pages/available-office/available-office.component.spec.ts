import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableOfficeComponent } from './available-office.component';

describe('AvailableOfficeComponent', () => {
  let component: AvailableOfficeComponent;
  let fixture: ComponentFixture<AvailableOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableOfficeComponent]
    });
    fixture = TestBed.createComponent(AvailableOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
