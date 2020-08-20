import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MailboxService } from '../../mailbox.service';
import { LoginService } from '../../login.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css', '../../../assets/materialize.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class InboxComponent implements OnInit, OnDestroy {


  messages: any = null;
  today = new Date();

  todayy(time: Date) {
    var test = new Date(time);
    if ((test.getDate() === this.today.getDate()) && (test.getMonth() === this.today.getMonth()) && (test.getFullYear() === this.today.getFullYear())) {
      return true;
    }
    else
      return false;
  }

  date(time: Date) {
    var test = new Date(time);
    if (((test.getDate() !== this.today.getDate()) || (test.getMonth() !== this.today.getMonth())) && (test.getFullYear() === this.today.getFullYear())) {
      return true;
    }
    else
      return false;
  }

  yesterday(time: Date) {
    var test = new Date(time);
    if ((test.getFullYear() !== this.today.getFullYear())) {
      return false;
    }
    else if ((this.today.getDate() - (test.getDate()) === 1) && (test.getMonth() === this.today.getMonth())) {
      return true;
    }

    else {
      return false;
    }
  }

  year(time: Date) {
    var test = new Date(time);
    if (test.getFullYear() === this.today.getFullYear()) {
      return false;
    }
    else
      return true;
  }
  constructor(private mailboxService: MailboxService) { }

  ngOnInit() {
    this.mailboxService.getInbox().
      subscribe(
        (response) => {
          this.messages = response.json().msg;
          this.mailboxService.unread = response.json().unread;
        },
        (error) => console.log(error)
      );

    // this.subscription = setInterval(() => {
    //   this.mailboxService.getInbox().
    //     subscribe(
    //       (response) => {
    //         var lol: any = response.json();
    //         if (this.messages.length !== lol.length) {
    //           console.log("change")
    //         }
    //       },
    //       (error) => console.log(error)
    //     );
    // }, 2000)
  }

  ngOnDestroy() {

    // clearInterval(this.subscription);
  }

}
