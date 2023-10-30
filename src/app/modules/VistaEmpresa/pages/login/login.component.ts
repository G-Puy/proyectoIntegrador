import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginService } from './login.service';
import { User } from 'src/app/interfaces/user.interfce';
interface LoginForm {
  usuario: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  formGroupLogin: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService) {
    this.formGroupLogin = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  ngOnInit() {

  }
  /* onLogin(): void {
    const formGroupLogin = this.formGroupLogin;
    let usuario: string = formGroupLogin.get('usuario').value;
    this.loginService.login(this.formGroupLogin.get('usuario').value, this.formGroupLogin.get('password').value)
      .subscribe(user => { })
  } */

  onSubmit() { }
}

