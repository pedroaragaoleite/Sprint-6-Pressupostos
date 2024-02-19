import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return a number', () => {
    expect(typeof component.total).toBe('number')
  });
  it('should not return NaN', () => {
    expect(typeof component.total).not.toBeNaN();
  });
  it('should return a number', () => {
    expect(typeof component.webCost).toBe('number')
  });
  it('should not return NaN', () => {
    expect(typeof component.webCost).not.toBeNaN();
  });
  it('should not return NaN', () => {
    expect(typeof component.updateCost()).not.toBeNaN();
  });

});
