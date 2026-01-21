import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ThemeService } from '../../services/theme.service';


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
}
