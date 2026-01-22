import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ThemeService } from '../../services/theme.service';
import { TodoFilter } from './todo.model';


@Component({
  selector: 'app-todo',
  imports: [CommonModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class TodoComponent {
  todoService = inject(TodoService);
  newTodo = signal('');
  constructor(public themeService: ThemeService) { }

  get isDark() {
    return this.themeService.isDark();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  addTodo(title: string) {
    this.todoService.addTodo(title);
  }

  filter(): string {
    return this.todoService.filter();
  }

  setFilter(filter: TodoFilter) {
    this.todoService.setFilter(filter);
  }

  filterTodos() {
    return this.todoService.filterTodos();
  }

  toggleTodo(id: number) {
    return this.todoService.toggleTodo(id);
  }

  enableEditing(id: number) {
    return this.todoService.enableEditing(id);
  }

  removeTodo(id: number) {
    return this.todoService.removeTodo(id);
  }
}
