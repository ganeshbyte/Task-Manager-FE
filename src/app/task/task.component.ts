import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TaskForm} from "../form/task.form";
import {TaskFormComponent} from "./task-form/task-form.component";
import {TaskVM} from "../view/task.view";
import {TaskService} from "../service/task.service";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    TaskFormComponent
  ],
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
         complete(): void {
         },
         next: (res :TaskVM[]) => {
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
}
