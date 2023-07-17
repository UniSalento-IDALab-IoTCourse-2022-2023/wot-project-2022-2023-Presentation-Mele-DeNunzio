import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoxSettingsPage } from './box-settings.page';

describe('BoxSettingsPage', () => {
  let component: BoxSettingsPage;
  let fixture: ComponentFixture<BoxSettingsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BoxSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
