import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { AuthResponse } from './auth-response.model';
import { User } from './user.model';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_key = "AIzaSyD-E2voDvEGuQM_8i8IFcd1S1aHBMrGnjI";
  signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {

  }


  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signUpUrl + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        this.handleAuthentication(response.email,response.localId,response.idToken,+response.expiresIn);
      })
    );
  }


  login(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signInUrl + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
          this.handleAuthentication(response.email,response.localId,response.idToken,+response.expiresIn);
      })
    );
  }


autoLogin(){
  const user:User=JSON.parse(localStorage.getItem("user"));

  if(!user){
    return;
  }

  const loadedUser=new User(
    user.email,
    user.id,
    user._token,
    new Date(user._tokenExpiration)
  );

      if(loadedUser.token){
        this.user.next(loadedUser);
      }


}

  logout(){
    this.user.next(null);
    //localStorage.setItem("user",JSON.stringify(null));
    localStorage.removeItem("user");
  }

  handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + (Number(expiresIn) * 1000));

    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);

    localStorage.setItem("user",JSON.stringify(user));
    console.log(user);
  }

}
