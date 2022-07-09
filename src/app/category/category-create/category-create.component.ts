import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../category.model';
import { AlertifyService } from '../../services/alertify.services';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService]
})
export class CategoryCreateComponent implements OnInit {

  constructor(private categoryService: CategoryService, private router: Router, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
  }

  createCategory(name: string) {
    setTimeout(() => {
      let hasValue = this.categoryService.hasCategory(name);
      console.log(hasValue);
      if (hasValue) {
        const category: Category = {
          name: name
        };

        this.categoryService.createCategory(category)
          .subscribe(data => {
            console.log(data);
            this.router.navigate(['/']);
          })
      }
      else {
        this.alertifyService.warning(name + " is already exist");
      }

    }, 500);




  }

}
