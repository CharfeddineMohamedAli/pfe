import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListeServ } from './admin-liste-serv';

describe('AdminListeServ', () => {
  let component: AdminListeServ;
  let fixture: ComponentFixture<AdminListeServ>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListeServ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListeServ);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
