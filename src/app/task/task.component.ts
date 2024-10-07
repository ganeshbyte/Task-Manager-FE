import {Component, OnInit, signal} from '@angular/core';
import {TaskFormComponent} from "./task-list/task-form/task-form.component";
import {TaskVM} from "../view/task.view";
import {TaskService} from "../service/task.service";
import {TaskListComponent} from "./task-list/task-list.component";
import {TaskHttp} from "../http/task.http";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    TaskFormComponent,
    TaskListComponent
  ],
  providers: [TaskService],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements  OnInit{

  tasks = signal<TaskVM[]>([]);

  constructor(private taskService: TaskService) {}

  ngOnInit() {
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

  Run() {
    console.log("I am Running")
  }

  Run2() {
    console.log("I am Running Also")
  }
}
