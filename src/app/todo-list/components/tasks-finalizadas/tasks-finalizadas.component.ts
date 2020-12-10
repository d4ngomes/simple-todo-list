import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { TodoService } from '../../todo.service';
import { Task } from '../../task';

@Component({
  selector: 'app-tasks-finalizadas',
  templateUrl: './tasks-finalizadas.component.html',
  styleUrls: ['./tasks-finalizadas.component.css']
})
export class TasksFinalizadasComponent implements OnInit {

  finalizadas$: Observable<Task[]>;

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.todoService.getTodoList().pipe(
      take(1),
      map(
        data => {
          this.finalizadas$ = this.todoService.todoList_.pipe(
            map(
              data => data.filter(task => task.finalizado)
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
