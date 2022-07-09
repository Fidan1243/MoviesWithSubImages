import { Component, OnInit, VERSION } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular ' + VERSION.major;

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
