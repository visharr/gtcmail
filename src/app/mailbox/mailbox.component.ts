import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MailboxService } from '../mailbox.service';
import { LoginService } from '../login.service';

declare var $: any;

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css', '../../assets/materialize.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class MailboxComponent implements OnInit {

  constructor(private mailboxService: MailboxService, private loginservice: LoginService) { }

  ngOnInit() {

    // sidenav
    $('.sidenav').sidenav();
    this.mailboxService.getInbox().
      subscribe(
        (response) => {
          this.mailboxService.unread = response.json().unread;
        },
        (error) => console.log(error)
      );

  }
}
