export class TaskVM{
  id : string;
  title: string;
  description: string;

  httpToView(http : TaskVM){
       if(!http){
         return;
       }
       const vm = new TaskVM();
       vm.id = http.id;
       vm.title = http.title;
       vm.description = http.description;
       return vm;
  }
}
