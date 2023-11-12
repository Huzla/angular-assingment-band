import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task1Component } from './task1/task1.component';
import { Task2Component } from './task2/task2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Task1Component, Task2Component],
  templateUrl: './app.component.html'
})
export class AppComponent {}
