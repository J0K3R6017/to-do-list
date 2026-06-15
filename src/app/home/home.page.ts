import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {map, Observable} from "rxjs";
import {TaskService} from "../services/task.service";
import {Task} from "../models/task.model";
import {CategoryService} from "../services/category.service";
import {Category} from "../models/category.model";
import {RemoteConfigService} from "../services/remote-config.service";
import { trashOutline } from "ionicons/icons";
import {addIcons} from "ionicons";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, ],
})
export class HomePage implements OnInit {
  tasks$: Observable<Task[]> | undefined;
  categories$: Observable<Category[]> | undefined;
  showTrash = true;

  newTaskTitle = '';
  selectedCategoryId: string | undefined;
  filterCategoryId: string | undefined;
  taskCategoryMap: { [taskId: string]: string } = {};

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private remoteConfigService: RemoteConfigService,
  ) { }

  async ngOnInit() {
    addIcons({ trashOutline });
    this.categories$ = this.categoryService.getCategories();
    this.tasks$ = this.taskService.getTasks();
    this.showTrash = await this.remoteConfigService.getFlag('show_trash');
  }

  getCategoryName(categoryId: string): string {
    let categoryName = '';
    this.categories$?.subscribe(categories => {
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        categoryName = category.name;
      }
    });
    return categoryName;
  }

  get filteredTasks$(): Observable<Task[]> {
    return this.tasks$?.pipe(
      map(tasks =>
        this.filterCategoryId
          ? tasks.filter(t => t.categoryId === this.filterCategoryId)
          : tasks
      )
    ) || new Observable<Task[]>();
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle.trim(), this.selectedCategoryId);
      this.newTaskTitle = '';
      this.selectedCategoryId = undefined;
    }
  }

  toggleTask(id: string) {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }
}
