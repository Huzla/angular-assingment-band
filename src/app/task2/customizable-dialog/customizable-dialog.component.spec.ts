import { ComponentFixture, TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { CustomizableDialogComponent } from './customizable-dialog.component';

describe('CustomizableDialogComponent', () => {
  let component: CustomizableDialogComponent;
  let fixture: ComponentFixture<CustomizableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizableDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomizableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('smoke test', () => {
    it('should not use title when undefined', () => {
      fixture.detectChanges();

      const titleElement = fixture.nativeElement.querySelector('.dialog-title');

      expect(titleElement).toEqual(null);
    });

    it('should use title passed as input', () => {
      component.title = 'Title goes here';
      fixture.detectChanges();

      const titleElement = fixture.nativeElement.querySelector('.dialog-title');

      expect(titleElement.textContent).toEqual('Title goes here');
    });

    it('should be closed by default', () => {
      const observerSpy = subscribeSpyTo(component.shouldClose$);

      expect(observerSpy.getValues()).toEqual([true]);
    });

    it('should allow showing based on input', () => {
      component.closed = false;
      fixture.detectChanges();
      component.ngOnInit();

      const observerSpy = subscribeSpyTo(component.shouldClose$);

      expect(observerSpy.getValues()).toEqual([false]);
    });
  });

  it('should call close on x button click', () => {
    component.closed = false;
    fixture.detectChanges();
    component.ngOnInit();

    spyOn(component, 'close');

    const closeButtonElement = fixture.nativeElement.querySelector('.close-button');
    closeButtonElement.click();

    const observerSpy = subscribeSpyTo(component.shouldClose$);

    expect(observerSpy.getValues()).toEqual([true])
  });

  describe('close', () => {
    it('should push to stream', () => {
      component.closed = false;
      fixture.detectChanges();
      component.ngOnInit();

      component.close();

      const observerSpy = subscribeSpyTo(component.shouldClose$);

      expect(observerSpy.getValues()).toEqual([true])
    });
  });

  describe('show', () => {
    it('should push to close stream', () => {
      component.show();

      const observerSpy = subscribeSpyTo(component.shouldClose$);
      
      expect(observerSpy.getValues()).toEqual([false])
    });
  });
});
