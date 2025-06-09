import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAjouterSousServ } from './admin-ajouter-sous-serv';

describe('AdminAjouterSousServ', () => {
  let component: AdminAjouterSousServ;
  let fixture: ComponentFixture<AdminAjouterSousServ>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAjouterSousServ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAjouterSousServ);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
