import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {TaskService} from "../services/task.service";
import {Task} from "../models/task.model";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class HomePage {
  tasks$: Observable<Task[]>;
  newTaskTitle = '';

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle.trim());
      this.newTaskTitle = '';
    }
  }

  toggleTask(id: string) {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }
}
