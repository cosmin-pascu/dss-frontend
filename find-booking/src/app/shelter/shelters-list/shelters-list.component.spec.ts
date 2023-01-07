import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheltersListComponent } from './shelters-list.component';

describe('SheltersListComponent', () => {
  let component: SheltersListComponent;
  let fixture: ComponentFixture<SheltersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheltersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SheltersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
