import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMedecinsPageComponent } from './liste-medecins-page.component';

describe('ListeMedecinsPageComponent', () => {
  let component: ListeMedecinsPageComponent;
  let fixture: ComponentFixture<ListeMedecinsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeMedecinsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMedecinsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
