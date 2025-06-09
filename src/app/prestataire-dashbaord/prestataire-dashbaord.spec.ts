import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestataireDashbaord } from './prestataire-dashbaord';

describe('PrestataireDashbaord', () => {
  let component: PrestataireDashbaord;
  let fixture: ComponentFixture<PrestataireDashbaord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestataireDashbaord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestataireDashbaord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
