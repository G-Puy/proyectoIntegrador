import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditGenericoComponent } from './add-edit-generico/add-edit-generico.component';
import { ListaConBuscadorGenericaComponent } from './lista-con-buscador-generica/lista-con-buscador-generica.component';
import { SharedModule } from '../shared/shared.module';
import { SnackbarComponent } from './snackbar-component/snackbar-component.component';
import { AceptarCancelarDialogComponent } from './aceptar-cancelar-dialog/aceptar-cancelar-dialog.component';
import { DialogbuscadorComponent } from '../modules/VistaClientes/pages/dialogbuscador/dialogbuscador.component';



@NgModule({
  declarations: [
    AddEditGenericoComponent,
    ListaConBuscadorGenericaComponent,
    SnackbarComponent,
    AceptarCancelarDialogComponent,
    DialogbuscadorComponent
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
