import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from './task';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: []
})
export class TodoComponent implements OnInit {

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      return
    }
    const newTask: Task = {
      id: new Date().getTime().toString(),
      nome: f.form.value.nome,
      finalizado: false,
      iniciado: false
    }
    this.todoService.addTask(newTask).subscribe();
    const todoList = this.todoService.todoList$.value.concat(newTask);
    this.todoService.todoList$.next(todoList);
    f.reset();
  }

}
