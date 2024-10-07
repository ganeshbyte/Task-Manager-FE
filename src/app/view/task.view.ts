import {TaskHttp} from "../http/task.http";

export class TaskVM{
  id : string;
  title: string;
  description: string;
  isEditMode: boolean;

  static httpToView(http : TaskHttp){
       let vm = new TaskVM();
       if(!http){
         return;
       }
       vm.id = http?.id;
       vm.title = http?.title;
       vm.description = http?.description;
       vm.isEditMode = false;
       console.log(vm);
       return vm;
  }
}
