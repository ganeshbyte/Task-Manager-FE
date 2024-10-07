import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {TaskHttp} from "../http/task.http";
import {TaskVM} from "../view/task.view";
import {UtilityFunction} from "../utility/function/utility.function";
import {TaskPayload} from "../payload/task.payload";
import {TaskForm} from "../form/task.form";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

interface TaskHttp2{
  task : TaskHttp
}
@Injectable({
    providedIn: "root"
})
export class TaskService{
    constructor(private http: HttpClient) {}

  getAllTasks() : Observable<Array<TaskVM>> {
      return this.http.get<TaskHttp[]>(`http://localhost:3000/api/v1/tasks`).pipe(
        map( res => UtilityFunction.mapArray(
          res, TaskVM.httpToView))
      ) as Observable<Array<TaskVM>> ;
    }

    getTask(taskId: string){
      return this.http.get<TaskVM>(`http://localhost:3000/api/v1/tasks/${taskId}`).pipe(
        map( res => TaskVM.httpToView(res))
      ) as Observable<TaskVM> ;
    }

  createTask(payload: TaskPayload) : Observable<TaskHttp> {
    return this.http.post<TaskHttp2>("http://localhost:3000/api/v1/tasks", payload).pipe(
      tap((res)=> console.log(res)),
      map( (res: TaskHttp2) => res?.task)
    )
  }

  updateTask(taskId: string, payload: TaskPayload) : Observable<TaskHttp> {
    return this.http.patch<TaskHttp2>(`http://localhost:3000/api/v1/tasks/${taskId}`, payload).pipe(
      tap((res)=> console.log(res)),
      map( (res: TaskHttp2) => res?.task)
    );
  }

  deleteTask(taskId : string){
    return this.http.delete<TaskHttp2>(`http://localhost:3000/api/v1/tasks/${taskId}`).pipe(
      map( (res : TaskHttp2) => res?.task)
    );
  }
}
