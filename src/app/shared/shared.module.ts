import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    FormsModule,
    //Material
    ReactiveFormsModule,
    MatExpansionModule
  ], exports: [

    FormsModule,
    //Material
    ReactiveFormsModule,
    MatExpansionModule,
    MatTreeModule
  ]
})
export class SharedModule { }
