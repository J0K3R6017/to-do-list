import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Category} from "../models/category.model";

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private storageKey = 'categories';
  private categories$ = new BehaviorSubject<Category[]>(this.load());

  private load(): Category[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private save(categories: Category[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(categories));
    this.categories$.next(categories);
  }

  getCategories() {
    return this.categories$.asObservable();
  }

  addCategory(name: string, color?: string) {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      color,
    };
    this.save([...this.categories$.value, newCategory]);
  }

  updateCategory(updated: Category) {
    const categories = this.categories$.value.map(cat =>
      cat.id === updated.id ? updated : cat
    );
    this.save(categories);
  }

  deleteCategory(id: string) {
    this.save(this.categories$.value.filter(cat => cat.id !== id));
  }
}
