import {Component, effect, OnInit, signal} from '@angular/core';
import {TaskVM} from "../../view/task.view";
import {TaskService} from "../../service/task.service";
import {NotificationService} from "../../service/notification.service";
import {ReactiveFormsModule} from "@angular/forms";
import {TaskFormComponent} from "./task-form/task-form.component";
import {TaskViewComponent} from "./task-view/task-view.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TaskFormComponent,
    TaskViewComponent
  ],
  providers: [TaskService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  tasks = signal<TaskVM[]>([]);

  constructor(private taskService: TaskService, private notificationService: NotificationService) {

    // effect(() => {
    //   const notification = this.notificationService.getNotification();
    //   if(notification?.type === 'TASK_LIST_UPDATED'){
    //     this.getTasks();
    //   }
    // });
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.taskService.getAllTasks().subscribe(
      {
        next: (res ) => {
          if(!res){
            return;
          }
          this.tasks.set(res);
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }

  onEditTask(index: number) {
    this.tasks().splice(index, 1, { ...this.tasks()[index], isEditMode : true});
  }

  onDeleteTask(taskId:string, index: number) {
    this.taskService.deleteTask(taskId).subscribe(
      {
        next: (res ) => {
          if(!res){
            return;
          }
          this.tasks().splice(index, 1);
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }
  onAddTask(task: TaskVM) {
    this.tasks.update(tasks => [...tasks, task]);
  }
  onUpdateTask(task: TaskVM, index: number) {
    this.tasks().splice(index, 1, task);
  }

  onUpdateTaskHandle(index: number) {
     this.tasks()[index] = { ...this.tasks()[index], isEditMode: true};
  }

}
