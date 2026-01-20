import { Injectable, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../pages/todo/todo.model';
import { todo } from 'node:test';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly STORAGE_KEY = 'todos';
  todos = signal<TodoItem[]>(this.loadFromLocalStorage());

  private loadFromLocalStorage(): TodoItem[] {
    if (typeof window === 'undefined') {
      return [];
    }
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveToLocalStorage(todos: TodoItem[]): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
  }

  private loadFromStorage(): TodoItem[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(todos: TodoItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
  }

  addTodo(title: string): void {
    const trimmed = title.trim();
    if (trimmed.length === 0) {
      return;
    }
    this.todos.update((list) => {
      const newList = [
        ...list,
        { id: Date.now(), title: trimmed, completed: false }
      ];
      this.saveToStorage(newList);
      return newList;
    });
  }

  removeTodo(index: number): void {
    this.todos.update(list => {
      const newList = list.filter(todo => todo.id !== index);
      this.saveToStorage(newList);
      return newList;
    });
  }

  isEmpty(): boolean {
    if (this.todos().length === 0) {
      return true;
    }
    return false;
  }

  toggleTodo(id: number): void {
    this.todos.update(list => {
      const newList = list.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      this.saveToStorage(newList);
      return newList;
    });
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
    if (!newTitle.trim()) {
      return;
    }
    this.todos.update((list) => {
      const newList = list.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: newTitle.trim(), editing: false };
        }
        return todo;
      });
      this.saveToStorage(newList);
      return newList;
    });
  }
}
