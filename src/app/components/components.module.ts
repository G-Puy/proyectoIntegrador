import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditGenericoComponent } from './add-edit-generico/add-edit-generico.component';
import { ListaConBuscadorGenericaComponent } from './lista-con-buscador-generica/lista-con-buscador-generica.component';
import { SharedModule } from '../shared/shared.module';
import { SnackbarComponent } from './snackbar-component/snackbar-component.component';



@NgModule({
  declarations: [
    AddEditGenericoComponent,
    ListaConBuscadorGenericaComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ListaConBuscadorGenericaComponent,
    AddEditGenericoComponent
  ]
})
export class ComponentsModule { }