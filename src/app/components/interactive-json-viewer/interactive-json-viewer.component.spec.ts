import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveJsonViewerComponent } from './interactive-json-viewer.component';

describe('InteractiveJsonViewerComponent', () => {
  let component: InteractiveJsonViewerComponent;
  let fixture: ComponentFixture<InteractiveJsonViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveJsonViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveJsonViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
