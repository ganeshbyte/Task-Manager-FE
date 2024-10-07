import {Component, EventEmitter, input, OnInit, Output, output, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TaskForm, TaskFormData} from "../../../form/task.form";
import {TaskVM} from "../../../view/task.view";
import {TaskService} from "../../../service/task.service";
import {NotificationService} from "../../../service/notification.service";

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
export class TaskFormComponent implements OnInit{

  isEditMode = signal<boolean>(false);
  taskForm: FormGroup<TaskForm>;
  taskFormData = signal<TaskFormData | undefined>(undefined);
  taskVM = input<TaskVM>(null);

  @Output() onUpdateTask = new EventEmitter<TaskVM>();
  @Output() onAddingTask = new EventEmitter<TaskVM>();

  constructor(private fb: FormBuilder, private taskService: TaskService,
              private notificationService: NotificationService) {}

  ngOnInit(){
    this.formInit();
    this.isEditMode.set(!!this.taskVM()?.isEditMode);
    if(this.isEditMode()){
      this.taskForm.patchValue(TaskFormData.viewToForm(this.taskVM()));
    }
  }

  formInit(){
    this.taskForm = this.fb.group(new TaskForm());
  }

  emitTaskVm(task: TaskVM, action: 'Update' | 'Add'){
    if(action === 'Update'){
      this.onUpdateTask.emit(task)
    }
    else if(action === 'Add'){
      this.onAddingTask.emit(task);
    }
  }

  onSubmit() {

    if(this.taskForm.invalid){
      this.taskForm.markAsTouched();
      return;
    }
    this.taskFormData.set(this.taskForm.value as TaskFormData);
    const payload = TaskFormData.formToPayload(this.taskFormData() as TaskFormData);

    this.isEditMode() ? this.taskService.updateTask(this.taskVM().id, payload).subscribe(
      {
        next: res => {
          if(!res){
            return;
          }
          const newUpdatedTask = TaskVM.httpToView(res);
          this.emitTaskVm(newUpdatedTask, 'Update');
          // this.notificationService.sendNotification({type: 'TASK_LIST_UPDATED'});
          this.taskForm.reset();
        }
      }
    ) : this.taskService.createTask(payload).subscribe(
      {
        next: res => {
          if(!res){
            return;
          }
          const newAddedTask = TaskVM.httpToView(res);
          this.emitTaskVm(newAddedTask, 'Add');
          // this.notificationService.sendNotification({type: 'TASK_LIST_UPDATED'});
          this.taskForm.reset();
        }
      }
    )
  }
}
