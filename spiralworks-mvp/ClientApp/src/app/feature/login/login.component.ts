import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models/Login';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder, private route: Router, private authenticationService: AuthenticationService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get fc() {
    return this.loginForm.controls;
  }

  submitForm() {

    this.submitted = true;


    if (this.loginForm.valid) {
      let login: Login;
      login = {
        username: this.fc.username.value,
        password: this.fc.password.value
      }

      this.authenticationService.login(login).subscribe(response => {
        //TODO
        this.alertify.success('logged in successfully');
        this.route.navigate(['/home']);
      },
        error => {
          this.errorMsg = 'login failed. ';
          this.alertify.error('login failed');
        });

    }

  }

  gotoRegister() {
    this.route.navigate(['/register']);
  }



}
