import {FormControl, Validators} from "@angular/forms";
import {TaskVM} from "../view/task.view";
import {TaskPayload} from "../payload/task.payload";

interface ITaskForm{
  id : string | FormControl<string>;
  title: string | FormControl<string>;
  description : string | FormControl<string>;
}

export class TaskForm implements ITaskForm{
  id = new FormControl(null);
  title = new FormControl(null, [Validators.required]);
  description = new FormControl(null, [Validators.required]);
}

export class TaskFormData implements ITaskForm{
  id : string;
  title : string;
  description : string;

  static viewToForm(taskVM: TaskVM){
      const taskFormData = new TaskFormData();
      taskFormData.id = taskVM.id;
      taskFormData.title = taskVM.title;
      taskFormData.description = taskVM.description;
      return taskFormData;
  }

  static formToPayload(formData: TaskFormData){
        const formPayload = new TaskPayload();
        formPayload.title = formData.title;
        formPayload.description = formData.description;
        return formPayload;
  }
}
