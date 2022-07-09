import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Category } from "./category.model";


@Injectable()
export class CategoryService {
    url = "http://localhost:3000/categories";
    url_firebase = "https://angular-movie-app-a83af-default-rtdb.firebaseio.com/";
    constructor(private http: HttpClient) {

    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.url_firebase + "categories.json")
            .pipe(
                map(response => {
                    const categories: Category[] = [];
                    for (const key in response) {
                        categories.push({ ...response[key], id: key });
                    }
                    return categories;
                })
            );
    }

    hasValue = false;
    hasCategory(category: string) {
        let categories = this.getCategories().
            subscribe(cc => {
                cc.forEach(c => {
                    for (let i = 0; i < cc.length; i++) {
                        const element = cc[i];
                        if (element.name == category) {
                            this.hasValue = true;       
                        }
                    }

                });
            }
            )
            
        return this.hasValue;
    }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.url_firebase + "categories.json", category);
    }
}