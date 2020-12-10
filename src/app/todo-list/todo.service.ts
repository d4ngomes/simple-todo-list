import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoList$ = new BehaviorSubject<Task[]>([]);
  todoList_ = this.todoList$.asObservable();
  path = 'http://localhost:3000/todolist/';

  constructor(
    private http: HttpClient
  ) { }

  getTodoList(): Observable<Task[]> {
    return this.http.get<Task[]>(this.path);
  }

  addTask(task: Task) {
    return this.http.post<Task>(this.path, task);
  }

  removeTask(id: String) {
    return this.http.delete<Task>(this.path + id);
  }

  toggle(event: any) {
    this.http
      .put(this.path + event.task.id, event.task)
      .subscribe(() => {

        const todoList = this.todoList$.value.map(
          task => {
            if (event.task.id === task.id) {
              return { ...task, ...event.task };
            } else {
              return task;
            }
          }
        )

        this.todoList$.next(todoList);
      });
  }
}
