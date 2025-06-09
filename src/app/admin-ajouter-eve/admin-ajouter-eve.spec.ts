import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAjouterEve } from './admin-ajouter-eve';

describe('AdminAjouterEve', () => {
  let component: AdminAjouterEve;
  let fixture: ComponentFixture<AdminAjouterEve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAjouterEve]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAjouterEve);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
