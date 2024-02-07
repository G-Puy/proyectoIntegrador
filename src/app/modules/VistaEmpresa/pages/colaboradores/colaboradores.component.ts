import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AceptarCancelarDialogComponent } from 'src/app/components/aceptar-cancelar-dialog/aceptar-cancelar-dialog.component';
import { DTOUsuario } from 'src/app/interfaces/usuario.interfce';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';
import { AgregareditarcolaboradoresComponent } from './agregareditarcolaboradores/agregareditarcolaboradores.component';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent implements OnInit {
  colaboradores: DTOUsuario[] = [];

  constructor(
    private sharedServ: SharedService,
    public dialog: MatDialog,
    private funcionesGlobalesService: FuncionesGlobalesService,) {
  }
  ngOnInit(): void {
    this.traerTodosLosColaboradores();
  }

  traerTodosLosColaboradores() {
    this.sharedServ.traerTodosLosColaboradores().subscribe({
      next: (response) => {
        this.colaboradores = response
          .filter(colaborador => colaborador.nombreDeUsuario !== localStorage.getItem('username'));
      },
      error: (error) => {
      }
    })
  }
  openDialogCancelar(colaborador: DTOUsuario) {
    const dialogRef = this.dialog.open(AceptarCancelarDialogComponent, {
      width: '300px',
      data: { message: `¿Desea eliminar ${colaborador.nombre} ${colaborador.apellido}?` },
      disableClose: true  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(colaborador.idUsuario);
      }
    });
  }
  private eliminar(idColaborador: number) {
    this.sharedServ.eliminarColaborador(idColaborador)
      .subscribe({
        next: (resultadoEliminar) => {
          if (resultadoEliminar) {
            this.funcionesGlobalesService.abrirSnack("El eliminado fue exitoso.", 2000, true);
            this.traerTodosLosColaboradores();
          }
          else {
            this.funcionesGlobalesService.abrirSnack("No se pudo eliminar", 2000, true);
          }
        },
        error: (error) => {
        }
      });
  }

  openDialogAgregarEditar(agregar: boolean, colaborador: DTOUsuario | null) {

    const dialogRef = this.dialog.open(AgregareditarcolaboradoresComponent, {
      width: '500px',
      data: { soyAgregar: agregar, colaborador: colaborador },
      disableClose: true  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.error != "") {
        this.funcionesGlobalesService.abrirSnack(result.error, 2000, false);
      } else if (result.result == true) {
        this.funcionesGlobalesService.abrirSnack("Operación exitosa.", 2000, true);
        this.traerTodosLosColaboradores();
      }
    });
  }
}
