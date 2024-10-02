import {FormControl} from "@angular/forms";
import {TaskVM} from "../view/task.view";
import {TaskPayload} from "../payload/task.payload";

interface ITaskForm{
  id : string | FormControl<string>;
  title: string | FormControl<string>;
  description : string | FormControl<string>;
}

export class TaskForm implements ITaskForm{
  id = new FormControl();
  title = new FormControl();
  description = new FormControl();
}

export class TaskFormData implements ITaskForm{
  id : string;
  title : string;
  description : string;

  viewToForm(taskVM: TaskVM){
      const taskFormData = new TaskFormData();
      taskFormData.id = taskVM.id;
      taskFormData.title = taskVM.title;
      taskFormData.description = taskVM.description;
      return taskFormData;
  }

  formToPayload(formData: TaskFormData){
        const formPayload = new TaskPayload();
        formPayload.title = formData.title;
        formPayload.description = formData.description;
        return formPayload;
  }
}
