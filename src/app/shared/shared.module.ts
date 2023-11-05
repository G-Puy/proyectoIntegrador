import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,

    FormsModule,
    //Material
    ReactiveFormsModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatIconModule




  ], exports: [

    FormsModule,
    //Material
    ReactiveFormsModule,
    MatExpansionModule,
    MatTreeModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatIconModule
  ]
})
export class SharedModule { }
