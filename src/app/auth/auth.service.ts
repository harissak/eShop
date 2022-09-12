import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogedIn= new Subject<boolean>();
  private loginStatus!:boolean;

  constructor() { }

  login() {
    this.loginStatus=true;
    this.isLogedIn.next(true);
  }

  logout () {
    this.loginStatus = false;
    this.isLogedIn.next(false);
  }

  getLogInStatus(){
    return this.loginStatus;
  }
}
