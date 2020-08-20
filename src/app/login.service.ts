import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Token } from "@angular/compiler";
import { Router } from "@angular/router";

@Injectable()

export class LoginService {
    user: any;
    loggedIn = false;

    isLoggedIn() {
        const promise = new Promise(
            (resolve, reject) => {
                // setTimeout(() => {
                resolve(this.loggedIn);
                // }, 800);
            }
        )
        return promise;
    }

    logout() {
        this.loggedIn = false;
        localStorage.removeItem('imsuser');
        localStorage.removeItem('imslogin');
        this.router.navigate(['']);
    }

    constructor(private http: Http, private router: Router) { }

    saveToken(token: any) {
        window.localStorage['imsuser'] = token;
    }

    checkAvailable(user: any) {
        return this.http.post('http://gtcmail-backend.herokuapp.com/users/available',
            { "email": user })
    }

    checkAvailableUsername(user: any) {
        return this.http.post('http://gtcmail-backend.herokuapp.com/users/availableusername',
            { "username": user })
    }

    storeUser(user: any) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('http://gtcmail-backend.herokuapp.com/users/signup',
            user).
            subscribe(
                (response) => {
                    this.saveToken(response.json().token);
                    this.getUser();
                    this.router.navigate(['']);
                },
                (error) => console.log(error.json().error)
            );
    }

    loginUser(user: any) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('http://gtcmail-backend.herokuapp.com/users/signin',
            user).
            subscribe(
                (response) => {// console.log(response.json().token);
                    this.saveToken(response.json().token);
                    this.getUser();
                    this.router.navigate(['']);
                },
                (error) => console.log(error)
            );
    }

    getUser() {
        const header = new Headers({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('imsuser') });
        return this.http.get('http://gtcmail-backend.herokuapp.com/users/getuser', { headers: header }).
            subscribe(
                (response) => { //console.log(response);
                    this.loggedIn = true;
                    localStorage.setItem('imslogin', 'true');
                    this.user = response.json();

                    if (!this.user.pfp) {
                        if (this.user.sex === "male") {
                            this.user.pfp = "../assets/male.jpg";
                        }
                        else {
                            this.user.pfp = "../assets/female.jpg";
                        }
                    }
                }
                ,
                (error) => {
                    localStorage.removeItem('imsuser');
                    localStorage.removeItem('imslogin');
                    this.router.navigate(['']);
                }
            );
    }

    getSecret() {
        const header = new Headers({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('imsuser') });
        return this.http.get('http://gtcmail-backend.herokuapp.com/mailbox/inbox', { headers: header }).
            subscribe(
                (response) => { //console.log(response);
                    console.log(response.json())
                },
                (error) => console.log(error)
            );
    }
}

