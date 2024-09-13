import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImrovementDialogComponent } from './edit-imrovement-dialog.component';

describe('EditImrovementDialogComponent', () => {
  let component: EditImrovementDialogComponent;
  let fixture: ComponentFixture<EditImrovementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditImrovementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditImrovementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
