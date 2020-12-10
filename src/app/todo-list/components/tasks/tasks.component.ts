import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Task } from '../../task';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  todoList$: Observable<Task[]>;

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.todoService.getTodoList().pipe(
      take(1),
      map(
        data => {
          this.todoList$ = this.todoService.todoList_.pipe(
            map(
              data => data.filter(task => !task.finalizado && !task.iniciado)
            )
          )
        }
      )
    ).subscribe();
  }

  onToggle(event) {
    this.todoService.toggle(event);
  }

}
