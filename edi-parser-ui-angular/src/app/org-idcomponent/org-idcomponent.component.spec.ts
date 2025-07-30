import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgIDComponentComponent } from './org-idcomponent.component';

describe('OrgIDComponentComponent', () => {
  let component: OrgIDComponentComponent;
  let fixture: ComponentFixture<OrgIDComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgIDComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgIDComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
