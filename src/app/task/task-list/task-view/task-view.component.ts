import {Component, EventEmitter, input, Output} from '@angular/core';
import {TaskVM} from "../../../view/task.view";

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {
  taskVM = input<TaskVM>();
  @Output() onUpdateTask = new EventEmitter<void>();

  @Output() onDeleteTask = new EventEmitter<void>();

  onUpdateTaskHandle() {
    this.onUpdateTask.emit();
  }

  onDeleteTaskHandle() {
    this.onDeleteTask.emit();
  }
}
