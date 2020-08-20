import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private loginService: LoginService) {

  }
  ngOnInit() {
    if (localStorage.getItem('imsuser')) {
      this.loginService.getUser();
    }
    else if (localStorage.getItem('imslogin')) {
      localStorage.removeItem('imslogin');
    }
  }
}
