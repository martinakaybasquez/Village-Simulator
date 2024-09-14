import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImprovementDialogComponent } from './add-improvement-dialog.component';

describe('AddImprovementDialogComponent', () => {
  let component: AddImprovementDialogComponent;
  let fixture: ComponentFixture<AddImprovementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddImprovementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImprovementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
