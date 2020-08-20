import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MailboxService } from '../../mailbox.service';
import { LoginService } from '../../login.service';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';


declare var $: any;
declare var M: any;

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class ComposeComponent implements OnInit {

  message = {
    to: '',
    subject: '',
    message: ''
  }

  validReceiver = false;
  compose: FormGroup;
  constructor(private mailboxService: MailboxService, private route: ActivatedRoute, private http: Http, private router: Router, private loginservice: LoginService) { }

  ngOnInit() {

    $(document).ready(function () {
      $('input#subject').characterCounter();
    });

    this.compose = new FormGroup({
      'to': new FormControl(null, [Validators.required,]), //, this.isValid.bind(this)
      'subject': new FormControl(null, [Validators.maxLength(80)]),
      'message': new FormControl(null, [Validators.required,]),
    });

    this.compose.controls['to'].valueChanges.subscribe((to) => {
      this.loginservice.checkAvailableUsername(to).
        subscribe(
          (response) => {
            this.validReceiver = !response.json().availbility;
          },
          (error) => {
            console.log(error)
          }
        );
    });
  }

  // isValid(control: FormControl): { [s: string]: boolean } {
  //     if(!this.validReciever) {
  //     console.log(this.validReciever)
  //     return { 'is invalid': true }
  //   }
  // }

  onSubmit() {
    if (!this.validReceiver) {
      M.toast({ html: 'Invalid Username', displayLength: 900 });
      return;
    }

    this.message.to = this.compose.get('to').value;
    this.message.message = this.compose.get('message').value;
    this.message.subject = this.compose.get('subject').value;
    const header = new Headers({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('imsuser') });
    return this.http.post('http://gtcmail-backend.herokuapp.com/mailbox/send', this.message, { headers: header }).
      subscribe(
        (response) => {
          M.toast({ html: 'Message Sent', displayLength: 900 })
          setTimeout(() => {
            this.router.navigate(['../'], { relativeTo: this.route })
          }, 1300);
        },(error)=>{
          M.toast({ html: 'Some error occured', displayLength: 900 })
        }

    );
  }
}
