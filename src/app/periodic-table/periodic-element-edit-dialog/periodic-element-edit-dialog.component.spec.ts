import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicElementEditDialogComponent } from './periodic-element-edit-dialog.component';

describe('PeriodicElementEditDialogComponent', () => {
  let component: PeriodicElementEditDialogComponent;
  let fixture: ComponentFixture<PeriodicElementEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodicElementEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodicElementEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
