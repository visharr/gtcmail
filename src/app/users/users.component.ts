import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css', '../../assets/bootstrap.min.css'],
    // encapsulation:ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

    constructor(private route: ActivatedRoute, private loginService: LoginService, private http: HttpClient, private router: Router) { }
    users: any;
    ngOnInit() {
        $(function () {

            $('.material-card > .mc-btn-action').click(function () {

                var card = $(this).parent('.material-card');
                var icon = $(this).children('i');
                icon.addClass('fa-spin-fast');

                if (card.hasClass('mc-active')) {
                    card.removeClass('mc-active');

                    window.setTimeout(function () {
                        icon
                            .removeClass('fa-arrow-left')
                            .removeClass('fa-spin-fast')
                            .addClass('fa-bars');

                    }, 800);
                } else {
                    card.addClass('mc-active');

                    window.setTimeout(function () {
                        icon
                            .removeClass('fa-bars')
                            .removeClass('fa-spin-fast')
                            .addClass('fa-arrow-left');

                    }, 800);
                }
            });
        });

        const header = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('imsuser') });
        return this.http.get('http://gtcmail-backend.herokuapp.com/users/profiles/', { headers: header }).
            subscribe(
                (response) => {
                    this.users = response;
                },
                (error) => {
                }
            );

    }
}
