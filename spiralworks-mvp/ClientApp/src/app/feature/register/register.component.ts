import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserRegister } from 'src/app/shared/models/UserRegister';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  registerResponse: string;
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  get fc() {
    return this.registerForm.controls;
  }

  submitForm() {
    this.submitted = true;

    if (this.registerForm.valid) {

      let userRegister: UserRegister;
      userRegister = {
        firstName: this.fc.firstName.value,
        lastName: this.fc.lastName.value,
        phone: this.fc.phone.value,
        email: this.fc.email.value,
        password: this.fc.password.value,
      };

      this.authenticationService.register(userRegister).subscribe(response => {
        console.log(response);
        this.alertify.success('successfully registered');


      },
        error => {
          this.alertify.error('email or phone already exist')
          console.log('2');
        });
    }


  }

}
