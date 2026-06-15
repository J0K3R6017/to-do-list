import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {Category} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss']
})
export class CategoryPage {
  categories$: Observable<Category[]>;
  newCategoryName = '';

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();
  }

  addCategory() {
    if (this.newCategoryName.trim()) {
      this.categoryService.addCategory(this.newCategoryName.trim());
      this.newCategoryName = '';
    }
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id);
  }
}
