import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MailboxService } from '../../mailbox.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../login.service';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-inbox-message',
  templateUrl: './inbox-message.component.html',
  styleUrls: ['./inbox-message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InboxMessageComponent implements OnInit {

  msg: any;
  sender: any;
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
    this.http.get('http://gtcmail-backend.herokuapp.com/mailbox/inbox/' + this.route.snapshot.params['id'], { headers: header }).
      subscribe(
        (response) => {
          this.msg = response;

          if (this.msg.read === false) {
            this.http.get('http://gtcmail-backend.herokuapp.com/mailbox/message/read/' + this.msg._id, { headers: header }).
              subscribe(
                (response) => {
                  this.msg.read = true;
                  this.mailboxService.unread--;
                },
                (error) => { }
              );
          }
          this.http.get('http://gtcmail-backend.herokuapp.com/users/profile/' + this.msg.from, { headers: header }).
            subscribe(
              (response) => {
                this.sender = response;
                if (this.sender.pfp) {
                  this.preview = this.sender.pfp
                }
                else {
                  if (this.sender.sex === "male") {
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

  unread() {
    var header = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('imsuser') });

    if (this.msg.read === true) {
      this.http.get('http://gtcmail-backend.herokuapp.com/mailbox/message/unread/' + this.msg._id, { headers: header }).
        subscribe(
          (response) => {
            this.msg.read = false;
            this.mailboxService.unread++;
            M.toast({ html: 'Marked as Unread', displayLength: 900 })
          },
          (error) => {
            M.toast({ html: 'Some error occured', displayLength: 900 })
          }
        );
    }
  }



  delete() {
    // $('.modal').modal('open');
    var header = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('imsuser') });

    this.http.get('http://gtcmail-backend.herokuapp.com/mailbox/message/inbox/delete/' + this.msg._id, { headers: header }).
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
