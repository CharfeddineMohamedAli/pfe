import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAjouterServ } from './admin-ajouter-serv';

describe('AdminAjouterServ', () => {
  let component: AdminAjouterServ;
  let fixture: ComponentFixture<AdminAjouterServ>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAjouterServ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAjouterServ);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
