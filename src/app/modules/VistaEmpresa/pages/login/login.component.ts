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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroupLogin: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.formGroupLogin = this.formBuilder.group({
      usuario: [null, Validators.required],
      password: [null, Validators.required]
    })

  }
  ngOnInit() {

  }


  onSubmit() { }
}

