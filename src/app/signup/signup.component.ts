import { Component, OnInit, ViewEncapsulation, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable'
import { LoginService } from '../login.service';

declare var $: any;
declare var M: any;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../../assets/materialize.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  user = {
    first_name: '',
    last_name: '',
    email: '',
    branch: '',
    year: '',
    username: '',
    password: '',
    sex: '',
    birthday: new Date()
  }

  constructor(private loginService: LoginService) { }

  signupForm: FormGroup;
  birthday: Date;
  validUser = false;
  validEmail = false;

  ngOnInit() {

    //select    
    $('select').formSelect();

    //datepicker   
    $('.datepicker').datepicker({
      autoClose: true,
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2002, 12, 12),
      yearRange: [1950, 2002],
      defaultDate: new Date(2000, 0, 1),
      setDefaultDate: true,
      onSelect: function (dateText, inst) {
        (<HTMLInputElement>document.getElementById("bday")).value = dateText;
      }
    });

    //modal    
    $('.modal').modal();

    //signup form
    this.signupForm = new FormGroup({
      'first_name': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9_]*$")], ),
      'last_name': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9_]*$")]),
      'branch': new FormControl(null, [Validators.required]),
      'year': new FormControl(null, [Validators.required]),
      'sex': new FormControl(null, [Validators.required]),
      'username': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9_]*$")]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(9)]),
      'repassword': new FormControl(null, [Validators.required, Validators.minLength(9)]),
      'birthday': new FormControl(null, ),
    }, passwordMatchValidator);

    //password match
    function passwordMatchValidator(g: FormGroup) {
      return g.get('password').value === g.get('repassword').value
        ? null : { 'mismatch': true };
    }

    //valid email and username
    this.signupForm.controls['email'].valueChanges.subscribe((email) => {
      this.loginService.checkAvailable(email).
        subscribe(
          (response) => {
            this.validEmail = response.json().availbility;
          },
          (error) => {
            console.log(error)
          }
        );
    });
    this.signupForm.controls['username'].valueChanges.subscribe((username) => {
      this.loginService.checkAvailableUsername(username).
        subscribe(
          (response) => {
            this.validUser = response.json().availbility;
          },
          (error) => {
            console.log(error)
          }
        );
    });
  }

  //Submit
  onSubmit() {
    this.user.first_name = this.signupForm.get('first_name').value;
    this.user.last_name = this.signupForm.get('last_name').value;
    this.user.username = this.signupForm.get('username').value;
    this.user.branch = this.signupForm.get('branch').value;
    this.user.year = this.signupForm.get('year').value;
    this.user.sex = this.signupForm.get('sex').value;
    this.user.email = this.signupForm.get('email').value;
    this.user.password = this.signupForm.get('password').value;
    this.user.birthday = new Date(((<HTMLInputElement>document.getElementById("bday")).value));
    this.loginService.storeUser(this.user);
  }
}
