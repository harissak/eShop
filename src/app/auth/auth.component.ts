import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService,public dialogRef: MatDialogRef<AuthComponent>) { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    });
  }

  onSubmit() {
    // const email = this.loginForm.value['email'];
    // console.log(this.loginForm.value);
    this.authService.login();
    this.dialogRef.close();
  }

}
