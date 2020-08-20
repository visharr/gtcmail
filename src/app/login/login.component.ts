import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable'
import { LoginService } from '../login.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';


declare var $: any;
declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',]// '../../assets/bootstrap.min.css'],
  , encapsulation: ViewEncapsulation.None

})
export class LoginComponent implements OnInit {



  maleImg = "../assets/male.jpg"
  femaleImg = "../assets/female.jpg"
  preview = "../assets/male.jpg"
  enterUser = true;
  enterPassword = false;

  validUser = false;
  loginUser = {
    user: '',
    password: '',
  }
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private http: Http, private router: Router) { }

  ngOnInit() {

    var self = this;

    $(document).ready(function () {
      $('.modal').modal(
        {
          onCloseStart: function () {
            // self.back();
          }
        }
      );
    });

    //login form
    this.loginForm = new FormGroup({
      'password': new FormControl(null, [Validators.required]),
      'user': new FormControl(null, [Validators.required]),
    });

    //input change
    this.loginForm.controls['user'].valueChanges.subscribe((user) => {
      this.loginService.checkAvailable(user).
        subscribe(
          (response) => {
            this.validUser = !response.json().availbility;
            if (this.validUser) {
              if (response.json().pfp) {
                this.preview = response.json().pfp;
              }
            }
          },
          (error) => {
            console.log(error)
          }
        );
      if (!this.validUser) {
        this.loginService.checkAvailableUsername(user).subscribe((response) => {
          this.validUser = !response.json().availbility;
          if (this.validUser) {
            if (response.json().pfp) {
              this.preview = response.json().pfp;
            }
          }
        },
          (error) => {
            console.log(error);
          });
      }
    });
  }

  //Enter key passed in user input
  onKeydown(event) {
    if (event.key === "Enter" && this.validUser) {
      this.next();
    }
  }

  //Show password field after entering user
  next() {

    // if(!this.validUser){
    //   M.toast({ html: 'Invalid Username', displayLength: 900 });
    //   return;
    // }

    this.enterUser = false;
    this.enterPassword = true;
  }

  //reset form 
  back() {
    this.enterUser = true;
    this.enterPassword = false;
    this.loginForm.get('user').reset();
    this.loginForm.get('password').reset();
  }

  //login request
  onSubmit() {
    this.loginUser.user = this.loginForm.get('user').value;
    this.loginUser.password = this.loginForm.get('password').value;
    this.http.post('http://gtcmail-backend.herokuapp.com/users/signin',
      this.loginUser).
      subscribe(
        (response) => {
          this.loginService.saveToken(response.json().token);
          this.loginService.user = response.json().user;
          this.loginService.getUser();
          this.back();
          $('.modal').modal('close');

          this.router.navigate(['']);
        },
        (error) => {

          M.toast({ html: 'Invalid Password', displayLength: 900 })
        }
      );
  }
}