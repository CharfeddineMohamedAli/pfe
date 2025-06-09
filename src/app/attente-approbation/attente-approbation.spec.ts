import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttenteApprobation } from './attente-approbation';

describe('AttenteApprobation', () => {
  let component: AttenteApprobation;
  let fixture: ComponentFixture<AttenteApprobation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttenteApprobation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttenteApprobation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
