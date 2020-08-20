import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../login.service';
import { Http, Headers, Response } from "@angular/http";
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx';
import { Token } from "@angular/compiler";
import { Route, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-gtcnav',
  templateUrl: './gtcnav.component.html',
  styleUrls: ['./gtcnav.component.css', '../../assets/materialize.min.css'],
  encapsulation: ViewEncapsulation.None
})

export class GtcnavComponent implements OnInit {



  constructor(private loginService: LoginService, private http: Http, private router: Router) { }

  ngOnInit() {

  }
}
