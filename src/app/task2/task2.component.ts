import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizableDialogComponent } from './customizable-dialog/customizable-dialog.component';

@Component({
  selector: 'app-task2',
  standalone: true,
  imports: [CommonModule, CustomizableDialogComponent],
  templateUrl: './task2.component.html'
})
export class Task2Component {

}
