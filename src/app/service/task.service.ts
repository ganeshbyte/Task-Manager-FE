import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {TaskHttp} from "../http/task.http";
import {TaskVM} from "../view/task.view";
import {UtilityFunction} from "../utility/function/utility.function";

@Injectable(
  {
    providedIn: "root"
  }
)
export class TaskService{
    constructor(private http: HttpClient) {}

    getAllTasks() : Observable<Array<TaskHttp>> {
      return this.http.get<TaskHttp[]>("http://localhost:3000/api/v1/tasks").pipe(
        map( res => UtilityFunction.mapArray(
          res, TaskVM.httpToView))
      );
    }
}
