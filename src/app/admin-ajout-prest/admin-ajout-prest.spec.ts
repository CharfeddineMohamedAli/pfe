import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAjoutPrest } from './admin-ajout-prest';

describe('AdminAjoutPrest', () => {
  let component: AdminAjoutPrest;
  let fixture: ComponentFixture<AdminAjoutPrest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAjoutPrest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAjoutPrest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
