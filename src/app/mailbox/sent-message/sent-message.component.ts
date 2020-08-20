import { Component, OnInit } from '@angular/core';
import { MailboxService } from '../../mailbox.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../login.service';

declare var $:any;
declare var M:any;

@Component({
  selector: 'app-sent-message',
  templateUrl: './sent-message.component.html',
  styleUrls: ['./sent-message.component.css']
})



export class SentMessageComponent implements OnInit {

  msg: any;
  receiver: any;
  maleImg = "../../assets/male.jpg"
  femaleImg = "../../assets/female.jpg"
  preview = "";

  constructor(private loginService: LoginService, private route: ActivatedRoute, private mailboxService: MailboxService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    
    $(document).ready(function () {
      $('.modal').modal();
    });

    $(document).ready(function () {
      $('.tooltipped').tooltip();
    });

    $(document).ready(function () {
      $('.fixed-action-btn').floatingActionButton({
        // direction: "left"
      });
    });

    var header = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('imsuser') });
    this.http.get('http://gtcmail-backend.herokuapp.com/mailbox/outbox/' + this.route.snapshot.params['id'], { headers: header }).
      subscribe(
        (response) => {
          this.msg = response;

         
          this.http.get('http://gtcmail-backend.herokuapp.com/users/profile/' + this.msg.to, { headers: header }).
            subscribe(
              (response) => {
                this.receiver = response;
                if (this.receiver.pfp) {
                  this.preview = this.receiver.pfp
                }
                else {
                  if (this.receiver.sex === "male") {
                    this.preview = this.maleImg;
                  }
                  else {
                    this.preview = this.femaleImg;
                  }
                }
              },
              (error) => {

              }
            );
        },
        (error) => {
          this.router.navigate(['../'], { relativeTo: this.route })
        }
      );
  }

  

  delete() {
    // $('.modal').modal('open');
    var header = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('imsuser') });

    this.http.get('http://gtcmail-backend.herokuapp.com/mailbox/message/outbox/delete/' + this.msg._id, { headers: header }).
      subscribe(
        (response) => {
          M.toast({ html: 'Message deleted', displayLength: 900 })
          setTimeout(() => {
            this.router.navigate(['../'], { relativeTo: this.route })
          }, 1300);
        },
        (error) => {
          M.toast({ html: 'Some error occured', displayLength: 900 })
        }
      );

  }


}
