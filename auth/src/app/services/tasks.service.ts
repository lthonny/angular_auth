import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ITask} from "../interfaces";

@Injectable()
export class TasksService {
  constructor(
    public http: HttpClient
  ) {
  }

  fetchOne(id: string) {
    return this.http.get(`/api/fetchOne/${id}`);
  }

  fetchAll() {
    return this.http.get(`/api/fetchAll`);
  }

  create(task: ITask) {
    return this.http.post(`/api/create`, task);
  }

  update(id: string, task: any) {
    return this.http.put(`/api/update/${id}`, task);
  }

  remove(id: string) {
    return this.http.delete(`/api/delete/${id}`);
  }
}
