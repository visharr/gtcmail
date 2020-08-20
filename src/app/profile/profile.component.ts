import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
        
  }
}
