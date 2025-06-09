import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListeSousServ } from './admin-liste-sous-serv';

describe('AdminListeSousServ', () => {
  let component: AdminListeSousServ;
  let fixture: ComponentFixture<AdminListeSousServ>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListeSousServ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListeSousServ);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
