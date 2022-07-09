import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;
  constructor(private authService: AuthService) {

  }

  ngOnInit() {

    this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      this.isAuthenticated = !!user;

    });

  }

  OnLogOut(){
    this.authService.logout();
  }

}