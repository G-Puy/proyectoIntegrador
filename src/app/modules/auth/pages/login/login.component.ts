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
import { DTOUsuario } from 'src/app/interfaces/usuario.interfce';
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


  formGroupLogin: FormGroup;
  errorLogin: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private autServ: AuthService,
    private router: Router) {
    this.formGroupLogin = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  ngOnInit() {

  }
  onLogin(): void {
    this.autServ.login(this.formGroupLogin.get('usuario')!.value, this.formGroupLogin.get('password')!.value)
      .subscribe(user => {
        if (user != null) {
          this.router.navigate(['/lEmpresa']);
        }
      }, error => {
        if (error.status == 400) {
          this.errorLogin = 'Usuario o contraseña incorrecto'
          this.resetError();
        }
      }
      );
  }

  private resetError(): void {

    setTimeout(() => {
      this.errorLogin = "";
    }, 2000);
  }



}

