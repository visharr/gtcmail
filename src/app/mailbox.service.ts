import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Token } from "@angular/compiler";
import { LoginService } from './login.service';

@Injectable()
export class MailboxService {

  unread: any;

  constructor(private http: Http, private loginService: LoginService) { }

  getInbox() {
    const header = new Headers({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('imsuser') });
    return this.http.get('http://gtcmail-backend.herokuapp.com/mailbox/inbox', { headers: header });
  }

  getOutbox() {
    const header = new Headers({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('imsuser') });
    return this.http.get('http://gtcmail-backend.herokuapp.com/mailbox/outbox', { headers: header });

  }

  send(message: any) {
    const header = new Headers({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('imsuser') });
    return this.http.post('http://gtcmail-backend.herokuapp.com/mailbox/send', message, { headers: header }).
      subscribe(
        (response) => { //console.log(response);
        },
        (error) => console.log(error)
      );
  }
}

