import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { Task } from '../../task';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() list: Task[];

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.todoService.getTodoList()
    .pipe(
      take(1)
    )
    .subscribe(
      data => {
        this.todoService.todoList$.next(data);
      }
    )
  }

  @Output()
  toggle = new EventEmitter<any>();

  toggleItem(index: number, acao: string) {
    const task = this.list[index];

    switch (acao) {
      case 'iniciar':
        task.finalizado = false;
        task.iniciado = true;
        break;
      case 'finalizar':
        task.finalizado = true;
        task.iniciado = false;
        break;
      case 'retomar':
        task.finalizado = false;
        task.iniciado = true;
        break;
      case 'cancelar':
        task.finalizado = false;
        task.iniciado = false;
        break;
    }

    this.toggle.emit({
      task: { ...task }
    });

  }

  onRemoveTask(id: string) {
    this.todoService.removeTask(id).subscribe();
    const todoList = this.todoService.todoList$.value.filter(
      task => task.id != id
    );
    console.log(todoList);
    this.todoService.todoList$.next(todoList);
  }

}
