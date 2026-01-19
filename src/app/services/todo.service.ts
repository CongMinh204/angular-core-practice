import { Injectable, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../pages/todo/todo.model';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly STORAGE_KEY = 'todos';
  todos = signal<TodoItem[]>(this.loadFromLocalStorage());

  private loadFromLocalStorage(): TodoItem[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveToLocalStorage(todos: TodoItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
  }

  addTodo(title: string): void {
    const trimmed = title.trim();
    if (trimmed.length === 0) {
      return;
    }
    const newTodo: TodoItem = {
      id: Date.now(),
      title: trimmed,
      completed: false,
    };

    this.todos.update((list) => [...list, newTodo]);
  }

  removeTodo(index: number): void {
    const list = [...this.todos()];
    list.splice(index, 1);
    this.todos.set(list);
  }

  isEmpty(): boolean {
    if (this.todos().length === 0) {
      return true;
    }
    return false;
  }

  toggleTodo(id: number): void {
    this.todos.update((list) =>
      list.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  enableEditing(id: number): void {
    this.todos.update((list) =>
      list.map((todo) =>
        todo.id === id ? { ...todo, editing: true } : todo
      )
    );
  }

  cancelEditing(id: number): void {
    this.todos.update((list) =>
      list.map((todo) =>
        todo.id === id ? { ...todo, editing: false } : todo
      )
    );
  }

  saveEditing(newTitle: string, id: number): void {
    this.todos.update((list) =>
      list.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle.trim(), editing: false } : todo
      )
    );
  }




}
