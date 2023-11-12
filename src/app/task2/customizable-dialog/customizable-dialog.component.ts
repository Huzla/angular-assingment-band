import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-customizable-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customizable-dialog.component.html',
  styleUrl: './customizable-dialog.component.scss'
})
export class CustomizableDialogComponent {
  @Input() title: string | undefined;
  @Input() closed: boolean | undefined;

  private _shouldCloseSubject$!: BehaviorSubject<boolean>;
  shouldClose$!: Observable<boolean>;

  ngOnInit() {
    this._shouldCloseSubject$ = new BehaviorSubject(this.closed ?? true);
    this.shouldClose$ = this._shouldCloseSubject$.asObservable();
  }

  close(): void {
    this._shouldCloseSubject$.next(true);
  }

  show(): void {
    this._shouldCloseSubject$.next(false);
  }

}
