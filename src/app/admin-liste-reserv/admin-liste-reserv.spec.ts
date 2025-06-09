import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListeReserv } from './admin-liste-reserv';

describe('AdminListeReserv', () => {
  let component: AdminListeReserv;
  let fixture: ComponentFixture<AdminListeReserv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListeReserv]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListeReserv);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
