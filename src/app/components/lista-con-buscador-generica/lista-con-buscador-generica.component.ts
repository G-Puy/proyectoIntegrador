import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { AddEditGenericoComponent } from '../add-edit-generico/add-edit-generico.component';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';
import { DTOGenAbms } from 'src/app/interfaces/objGenericoParaABMS.interface';
import { AceptarCancelarDialogComponent } from '../aceptar-cancelar-dialog/aceptar-cancelar-dialog.component';



@Component({
  selector: 'app-lista-con-buscador-generica',
  templateUrl: './lista-con-buscador-generica.component.html',
  styleUrls: ['./lista-con-buscador-generica.component.css']
})
export class ListaConBuscadorGenericaComponent implements OnInit {
  @Input() seccionOrigen!: string;
  @Input() textoSeccion!: string;
  textoBtn: string = "Agregar nuevo";
  opcionBusqueda: string = "Nombre";


  parametroFiltrado: string = "";
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort;

  displayedColumns: string[] = ['id', 'nombre', 'eliminar', 'editar'];
  dataSource: MatTableDataSource<DTOGenAbms>;
  dataSourceOriginal: DTOGenAbms[] = [];
  constructor(public dialog: MatDialog,
    private funcionesGlobalesService: FuncionesGlobalesService,
    private sharedServ: SharedService
  ) {
    // este array va a ser sumplantado por el servicio necesario segun orgien.
    this.dataSource = new MatTableDataSource(this.dataSourceOriginal);
  }


  ngOnInit() {

    this.getAll();
  }
  filtrar() {
    if (this.parametroFiltrado != "") {
      if (this.opcionBusqueda == "Nombre") {
        const resultadoFiltrado = this.dataSourceOriginal.filter(elemento =>
          elemento.nombre.toLowerCase().includes(this.parametroFiltrado.toLowerCase())
        );
        this.dataSource = new MatTableDataSource(resultadoFiltrado);
        this.dataSource.sort = this.sort;
      } else if (this.opcionBusqueda == "Id") {

        const resultadoFiltrado = this.dataSourceOriginal.filter(elemento =>
          elemento.id.toString() == this.parametroFiltrado
        );
        this.dataSource = new MatTableDataSource(resultadoFiltrado);
        this.dataSource.sort = this.sort;

      }

    } else {
      this.dataSource = new MatTableDataSource(this.dataSourceOriginal);
      this.dataSource.sort = this.sort;
    }
  }

  private getAll() {
    switch (this.seccionOrigen) {
      case 'tipoprenda':
        this.sharedServ.getAllTipoPrendas()
          .subscribe({
            next: (resultadoAlta) => {
              this.dataSourceOriginal = resultadoAlta;
              // Aquí asignas el resultado a dataSource y puedes usar sort
              this.dataSource = new MatTableDataSource(resultadoAlta); // Asegúrate de que esto es MatTableDataSource
              this.dataSource.sort = this.sort;
              // Opcional: Si deseas establecer el orden predeterminado
              this.dataSource.sort.active = 'nombre';
              this.dataSource.sort.direction = 'asc';
            },
            error: (error) => {
            }
          });

        break;
      case 'colores':
        this.sharedServ.getAllColores()
          .subscribe({
            next: (resultadoAlta) => {
              this.dataSourceOriginal = resultadoAlta;
              // Aquí asignas el resultado a dataSource y puedes usar sort
              this.dataSource = new MatTableDataSource(resultadoAlta); // Asegúrate de que esto es MatTableDataSource
              this.dataSource.sort = this.sort;
              // Opcional: Si deseas establecer el orden predeterminado
              this.dataSource.sort.active = 'nombre';
              this.dataSource.sort.direction = 'asc';
            },
            error: (error) => {
            }
          });

        break;
      case 'talles':
        this.sharedServ.getAllTalles()
          .subscribe({
            next: (resultadoAlta) => {
              this.dataSourceOriginal = resultadoAlta;
              // Aquí asignas el resultado a dataSource y puedes usar sort
              this.dataSource = new MatTableDataSource(resultadoAlta); // Asegúrate de que esto es MatTableDataSource
              this.dataSource.sort = this.sort;
              // Opcional: Si deseas establecer el orden predeterminado
              this.dataSource.sort.active = 'nombre';
              this.dataSource.sort.direction = 'asc';
            },
            error: (error) => {
            }
          });

        break;
    }
  }

  abrirDialogAgregar() {
    const datos = {
      seccionOrigen: this.seccionOrigen
    };

    const dialogRef = this.dialog.open(AddEditGenericoComponent, {
      width: this.funcionesGlobalesService.tamMaxDialogMobile(),
      height: '200px',
      data: {
        origen: this.seccionOrigen,
        editar: false,
        textoMostrar: "Agregar nuevo",
        objeto: null
      }
    });
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado.error != "") {
        this.funcionesGlobalesService.abrirSnack(resultado.error, 2000, false);
      } else if (resultado.result == true) {
        this.funcionesGlobalesService.abrirSnack("El alta fue exitosa.", 2000, true);
        this.getAll();
      }
    });
  }

  abrirDialogEditar(obj: DTOGenAbms) {
    const datos = {
      seccionOrigen: this.seccionOrigen
    };

    const dialogRef = this.dialog.open(AddEditGenericoComponent, {
      width: this.funcionesGlobalesService.tamMaxDialogMobile(),
      height: '210px',
      data: {
        origen: this.seccionOrigen,
        editar: true,
        textoMostrar: "Editar",
        objeto: obj
      }
    });
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado.error != "") {
        this.funcionesGlobalesService.abrirSnack(resultado.error, 2000, false);
      } else if (resultado.result == true) {
        this.funcionesGlobalesService.abrirSnack("Edición exitosa.", 2000, true);
        this.getAll();
      }

    });



  }



  private eliminar(obj: DTOGenAbms) {
    switch (this.seccionOrigen) {

      case 'tipoprenda':
        this.sharedServ.eliminarTipoPrenda(obj.id)
          .subscribe({
            next: (resultadoEliminar) => {
              if (resultadoEliminar) {
                this.funcionesGlobalesService.abrirSnack("El eliminado fue exitoso.", 2000, true);
                this.getAll();
              }
              else {
                this.funcionesGlobalesService.abrirSnack("No se pudo eliminar", 2000, true);
              }
            },
            error: (error) => {
              this.funcionesGlobalesService.abrirSnack(error.error, 2000, false);

            }
          });
        break;
      case 'colores':
        this.sharedServ.eliminarColor(obj.id)
          .subscribe({
            next: (resultadoEliminar) => {
              if (resultadoEliminar) {
                this.funcionesGlobalesService.abrirSnack("El eliminado fue exitoso.", 2000, true);
                this.getAll();
              }
              else {
                this.funcionesGlobalesService.abrirSnack("No se pudo eliminar", 2000, true);
              }
            },
            error: (error) => {
              this.funcionesGlobalesService.abrirSnack(error.error, 2000, false);
            }
          });

        break;
      case 'talles':
        this.sharedServ.eliminarTalle(obj.id)
          .subscribe({
            next: (resultadoEliminar) => {
              if (resultadoEliminar) {
                this.funcionesGlobalesService.abrirSnack("El eliminado fue exitoso.", 2000, true);
                this.getAll();
              }
              else {
                this.funcionesGlobalesService.abrirSnack("No se pudo eliminar", 2000, true);
              }
            },
            error: (error) => {
              this.funcionesGlobalesService.abrirSnack(error.error, 2000, false);
            }
          });

        break;
    }
  }


  openDialogCancelar(obj: DTOGenAbms) {

    const dialogRef = this.dialog.open(AceptarCancelarDialogComponent, {
      width: '300px',
      data: { message: `¿Desea eliminar ${obj.nombre}?` },
      disableClose: true  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(obj);
      }
    });
  }





}
