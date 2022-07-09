import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, map, Observable, tap, throwError } from "rxjs";
import { Movie } from "./movie.model";
import { MyList } from "./mylist.model";

@Injectable()
export class MovieService {
    url = "http://localhost:3000/movies";
    url_firebase = "https://angular-movie-app-a83af-default-rtdb.firebaseio.com/";
    constructor(private http: HttpClient) {

    }

    getMovies(categoryId: number): Observable<Movie[]> {
        let newUrl = this.url_firebase + "movies.json";


        return this.http.get<Movie[]>(newUrl)
            .pipe(
                map(response => {
                    const movies: Movie[] = [];

                    for (const key in response) {
                        if (categoryId) {
                            if (categoryId == response[key].categoryId) {
                                movies.push({ ...response[key], id: key });
                            }
                        }
                        else {
                            movies.push({ ...response[key], id: key });
                        }
                    }

                    return movies;
                }),
                tap(data => console.log(data)),
                catchError(this.handleError),
                delay(500)
            );
    }


    createMovie(movie: any): Observable<Movie> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Token'
            })
        };
        return this.http.post<any>(this.url_firebase + "movies.json", movie, httpOptions)
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError),
                delay(500)
            );
    }

    removeFromList(item: MyList): Observable<MyList> {
        return this.http.delete<MyList>(this.url_firebase + "/users/" + item.userId + "/list/" + item.movieId + ".json")
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError)
            )
    }

    getList(userId: string): Observable<string[]> {
        return this.http.get<string[]>(this.url_firebase + "/users/" + userId + "/list.json")
            .pipe(
                map(response => {
                    const movies: string[] = [];
                    for (const key in response) {
                        movies.push(key);
                    }
                    return movies;
                }
                ),
                tap(data => console.log(data)),
                catchError(this.handleError)

            )
    }


    updateMovie(item:Movie):Observable<any>{
        console.log(item+" in update")
        return this.http.put<any>(this.url_firebase + "movies/"+ item.id+".json",item)
            .pipe(
                tap(data => console.log("successfull")),
                catchError(this.handleError)
            );
    }

    addToMyList(item: MyList): Observable<MyList> {
        return this.http.post<MyList>(this.url_firebase + "/users/" + item.userId + "/list/" + item.movieId + ".json", {
            dateAdded: new Date().getTime()
        }).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        )
    }


    getMovieById(movieId: string): Observable<Movie> {
        return this.http.get<Movie>(this.url_firebase + "movies/" + movieId + ".json")
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError)
            );
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            //client or network
            console.log("Error : " + error.error.message);
        }
        else {
            switch (error.status) {
                case 404:
                    console.log("Not Found");
                    break;
                case 403:
                    console.log("Access Denied");
                    break;
                case 500:
                    console.log("Internal server");
                    break;
                default:
                    console.log("some unknow error happened");
            }
        }
        return throwError(() => new Error("some error happened"));
    }

}