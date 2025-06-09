import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListEve } from './admin-list-eve';

describe('AdminListEve', () => {
  let component: AdminListEve;
  let fixture: ComponentFixture<AdminListEve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListEve]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListEve);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
