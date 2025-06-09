import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListePresta } from './admin-liste-presta';

describe('AdminListePresta', () => {
  let component: AdminListePresta;
  let fixture: ComponentFixture<AdminListePresta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListePresta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListePresta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
