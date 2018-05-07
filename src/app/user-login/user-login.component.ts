///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: 'user-login.component.html',
  styleUrls: ['user-login.component.scss']
})

export class UserLoginComponent {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/user-profile']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }

}
