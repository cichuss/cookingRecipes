import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterHeaderMenuLayoutComponent } from './footer-header-menu-layout.component';

describe('FooterHeaderMenuLayoutComponent', () => {
  let component: FooterHeaderMenuLayoutComponent;
  let fixture: ComponentFixture<FooterHeaderMenuLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterHeaderMenuLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterHeaderMenuLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
