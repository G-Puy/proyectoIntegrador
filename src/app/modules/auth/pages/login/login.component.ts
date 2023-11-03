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
import { User } from 'src/app/interfaces/user.interfce';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
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

  user: User = {
    id: 123,
    usuario: 'pepe',
    correo: 'pepe@gmail.com'

  };
  formGroupLogin: FormGroup;
  errorLogin: string = '';
  constructor(private formBuilder: FormBuilder,
    private loginService: AuthService,
    private router: Router) {
    this.formGroupLogin = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  ngOnInit() {
    // console.log('LOGIN >>');

  }
  onLogin(): void {
    const formGroupLogin = this.formGroupLogin;
    let usuario: string = formGroupLogin.get('usuario')!.value;
    this.loginService.login(this.formGroupLogin.get('usuario')!.value, this.formGroupLogin.get('password')!.value)
      .subscribe(user => {
        this.router.navigate(['/lEmpresa/homeEmpresa']);
      })
  }


  onSubmit() {
    localStorage.setItem('token', 'AdsafSADF234sdgfa$3ag43q2gsaf')
    this.router.navigate(['/lEmpresa/homeEmpresa']);
  }
}

