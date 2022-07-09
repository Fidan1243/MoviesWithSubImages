import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category | null = null;
  constructor(private categoryService:CategoryService) {
  
  }

  displayAll = true;
  selectCategory(item?: Category) {
    if (item) {
      this.selectedCategory = item;
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    })
  }
}