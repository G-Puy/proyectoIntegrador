import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    FormsModule,
    //Material
    ReactiveFormsModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule

  ], exports: [

    FormsModule,
    //Material
    ReactiveFormsModule,
    MatExpansionModule,
    MatTreeModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class SharedModule { }
