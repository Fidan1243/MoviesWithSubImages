import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../category/category.model';
import { AlertifyService } from '../../services/alertify.services';
import { CategoryService } from '../../category/category.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [CategoryService, MovieService, AlertifyService]
})
export class MovieCreateComponent implements OnInit {
  categories: Category[];
  model: any = { categoryId: -1 };
  constructor(private categoryService: CategoryService,
    private movieService: MovieService,
    private alertifyService: AlertifyService,
    private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  movieForm = new FormGroup({
    title: new FormControl("Movie New",[Validators.required,Validators.minLength(5)]),
    description: new FormControl("",[Validators.required]),
    imageUrl: new FormControl("",[Validators.required]),
    categoryId: new FormControl("",[Validators.required])
  });

  ClearForm(){
    this.movieForm.patchValue({
      title:'',
      description:'',
      imageUrl:'',
      categoryId:'-1'
    });
  }

  createMovie() {





    //console.log(form);
    // console.log(form.controls["categoryId"].value);
    // console.log(form.value);
    //console.log(this.model);

    // if(title.value==""){
    //   this.alertifyService.error("You should write title");
    //   return;
    // }
    // if(title.value.length<5){
    //   this.alertifyService.warning("you should write at least 5 characters");
    //   return;
    // }
    // if(description.value==""){
    //   this.alertifyService.error("You should write description");
    //   return;
    // }
    // if(imageUrl.value==""){
    //   this.alertifyService.error("You should write imageUrl");
    //   return;
    // }
    // if(categoryId.value=="-1"){
    //   this.alertifyService.error("You should write category");
    //   return;
    // }

    const movie = {
      id:0,
      title:this.movieForm.value.title,
      description:this.movieForm.value.description,
      imageUrl:this.movieForm.value.imageUrl,
      isPopular:false,
      datePublished:new Date().getTime(),
      categoryId:this.movieForm.value.categoryId
    };

      this.movieService.createMovie(movie)
      .subscribe(data=>
        {
          console.log(data);
          this.router.navigate(['/movies'])});


  }

}
