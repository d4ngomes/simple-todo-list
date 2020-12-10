import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './todo-list/components/tasks/tasks.component';
import { TasksFinalizadasComponent } from './todo-list/components/tasks-finalizadas/tasks-finalizadas.component';
import { TasksIniciadasComponent } from './todo-list/components/tasks-iniciadas/tasks-iniciadas.component';
import { TodoListComponent } from './todo-list/components/todo-list/todo-list.component';
import { TodoComponent } from './todo-list/todo.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TasksFinalizadasComponent,
    TasksIniciadasComponent,
    TodoListComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
