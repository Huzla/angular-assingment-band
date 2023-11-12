import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
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

  it('should be closed by default', () => {
    const dialogElement = fixture.nativeElement.querySelector('.customizable-dialog');

    const observerSpy = subscribeSpyTo(component.shouldClose$);

    expect(observerSpy.getValues()).toEqual([true]);
    expect(dialogElement).toEqual(null);
  });

  describe('visible state test', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(CustomizableDialogComponent);
      component = fixture.componentInstance;
      component.closed = false;
      fixture.detectChanges();
      component.ngOnInit();
    });

    describe('smoke test', () => {
      it('should allow showing based on input', () => {
        const observerSpy = subscribeSpyTo(component.shouldClose$);
  
        expect(observerSpy.getValues()).toEqual([false]);
      });
      
      it('should not use title when undefined', () => {
        const titleElement = fixture.nativeElement.querySelector('.dialog-title');
  
        expect(titleElement).toEqual(null);
      });
  
      it('should use title passed as input', () => {
        component.title = 'Title goes here';
        fixture.detectChanges();
  
        const titleElement = fixture.nativeElement.querySelector('.dialog-title');
  
        expect(titleElement.textContent).toEqual('Title goes here');
      });
    });
  
    it('should close on x button click', () => { 
      const closeButtonElement = fixture.nativeElement.querySelector('.dialog-close-button');
      closeButtonElement.click();
  
      const observerSpy = subscribeSpyTo(component.shouldClose$);
  
      expect(observerSpy.getValues()).toEqual([true])
    });
  
    describe('close', () => {
      it('should push to stream', () => {
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
});
