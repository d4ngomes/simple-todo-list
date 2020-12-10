import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Task } from '../../task';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-tasks-iniciadas',
  templateUrl: './tasks-iniciadas.component.html',
  styleUrls: ['./tasks-iniciadas.component.css']
})
export class TasksIniciadasComponent implements OnInit {

  iniciadas$: Observable<Task[]>;

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.todoService.getTodoList().pipe(
      take(1),
      map(
        data => {
          this.iniciadas$ = this.todoService.todoList_.pipe(
            map(
              data => data.filter(task => task.iniciado)
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
