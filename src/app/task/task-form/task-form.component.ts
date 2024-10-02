import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TaskForm} from "../../form/task.form";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  taskForm: FormGroup<TaskForm>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(){
    this.formInit();
  }

  formInit(){
    this.taskForm = this.fb.group(new TaskForm());
  }
  onSubmit() {
    console.log(this.taskForm.value);
  }
}
