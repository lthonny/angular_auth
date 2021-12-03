import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICreateTask, IHistoryTask, IResAssigned, ITask} from "../../../interfaces";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public _nameTask: string = '';

  constructor(
    private http: HttpClient
  ) {
  }

  public createTask$(data: ICreateTask): Observable<ITask> {
    return this.http.post<ITask>(`/api/task`, {data});
  }

  public updateTitleTask$(task_id: number, title: string): Observable<ITask> {
    return this.http.put<ITask>(`/api/task/${task_id}/title`, {title})
      .pipe(tap((data) => this._nameTask = data.title));
  }

  public updateNameColumnTask$(task_id: number, order: number, nameTaskList: string): Observable<ITask> {
    return this.http.put<ITask>(`/api/task/${task_id}/column`, {nameTaskList, order});
  }

  // (task_id: number) добавить!!
  public updateOrderTask$(data: any): Observable<string> {
    console.log(data.id);
    return this.http.put<string>(`/api/task/${data.id}/order`, {data});
  }

  public updateDescriptionTask$(task_id: number, description: string): Observable<ITask> {
    return this.http.put<ITask>(`/api/task/${task_id}/description`, {description});
  }

  public deleteTask$(task_id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/task/${task_id}`);
  }

  public getHistory$(task_id: number): Observable<IHistoryTask[]> {
    return this.http.get<IHistoryTask[]>(`/api/task/${task_id}/history`);
  }

  public getAllAssignedUsers$(task_id: number): Observable<IResAssigned> {
    return this.http.get<IResAssigned>(`/api/task/${task_id}/assigned`);
  }
}
