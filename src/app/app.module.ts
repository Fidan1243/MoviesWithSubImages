import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { FooterComponent } from './footer/footer.component';
import { AlertifyService } from './services/alertify.services';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AlertComponent } from './shared/alert/alert.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { MoviesModule } from './movies/movies.module';
import { CategoriesModule } from './category/categories.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';

@NgModule({
  imports: [BrowserModule, MoviesModule,  FormsModule, HttpClientModule, AppRoutingModule, AuthModule, CoreModule, ReactiveFormsModule], // modules
  declarations: [
    AppComponent,
    NavbarComponent,
    
    FooterComponent,
    
  ], //component  providers - services
  providers: [AlertifyService,
    ],
  bootstrap: [AppComponent], //starter component
})
export class AppModule { }
