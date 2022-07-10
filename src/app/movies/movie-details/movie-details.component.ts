import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.services';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers:[MovieService,UploadService]
})
export class MovieDetailsComponent implements OnInit {
  files:File[]=[];
  movie:Movie;

  constructor(private movieService:MovieService,
              private activatedRouted:ActivatedRoute, private _uploadService:UploadService, private router:Router) { }
  
  onSelect(event:any) {
    

    const file_data = event.addedFiles[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'angular_cl');
    data.append('cloud_name', 'dp7nbcupa');

    this._uploadService.uploadImage(data).subscribe((response) => {
      if (response) {
        console.log("hello")
        this.movie.subImages.push(response.secure_url);
        console.log(this.movie)
        this.movieService.updateMovie(this.movie).subscribe(data=>
          {
            console.log(data);
      }
    });
  }
  
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit() {
    this.activatedRouted.params.subscribe(params=>{
      this.movieService.getMovieById(params["movieId"])
      .subscribe(data=>{
        this.movie=data;
        if(this.movie.subImages==null){

          this.movie.subImages = [];
        }
      })
    })
  }

}
