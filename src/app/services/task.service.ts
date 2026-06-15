import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Task} from "../models/task.model";

@Injectable({ providedIn: 'root' })
export class TaskService {
  private storageKey = 'tasks';
  private tasks$ = new BehaviorSubject<Task[]>(this.loadTasks());

  private loadTasks(): Task[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveTasks(tasks: Task[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    this.tasks$.next(tasks);
  }

  getTasks() {
    return this.tasks$.asObservable();
  }

  addTask(title: string, categoryId?: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      categoryId
    };
    this.saveTasks([...this.tasks$.value, newTask]);
  }

  toggleTask(id: string) {
    const updated = this.tasks$.value.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks(updated);
  }

  deleteTask(id: string) {
    const filtered = this.tasks$.value.filter(task => task.id !== id);
    this.saveTasks(filtered);
  }
}
