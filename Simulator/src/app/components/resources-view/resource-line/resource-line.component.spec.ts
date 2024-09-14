import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceLineComponent } from './resource-line.component';

describe('ResourceLineComponent', () => {
  let component: ResourceLineComponent;
  let fixture: ComponentFixture<ResourceLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
