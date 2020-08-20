import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', '../../assets/bootstrap.min.css'],
  // encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  maleImg = "../assets/male.jpg"
  femaleImg = "../assets/female.jpg"
  preview = ""

  user: any = {
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

  constructor(private route: ActivatedRoute, private loginService: LoginService, private http: HttpClient, private router: Router) { }

  ngOnInit() {

    const header = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('imsuser') });
    return this.http.get('http://gtcmail-backend.herokuapp.com/users/profile/' + this.route.snapshot.params['id'], { headers: header }).
      subscribe(
        (response) => {
          this.user = response;

          if (this.user.pfp) {
            this.preview = this.user.pfp
          }
          else {
            if (this.user.sex === "male") {
              this.preview = this.maleImg;
            }
            else {
              this.preview = this.femaleImg;
            }
          }
        },
        (error) => {
          this.router.navigate(['../'], { relativeTo: this.route })
        }
      );
  }
}
