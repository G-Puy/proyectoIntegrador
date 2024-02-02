import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DTOUsuario } from 'src/app/interfaces/usuario.interfce';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-agregareditarcolaboradores',
  templateUrl: './agregareditarcolaboradores.component.html',
  styleUrls: ['./agregareditarcolaboradores.component.css']
})
export class AgregareditarcolaboradoresComponent implements OnInit {
  colaboradorForm: FormGroup;
  txtError: string = '';
  colaborador: DTOUsuario = {
    idUsuario: 0,
    nombreDeUsuario: '',
    contrasenia: '',
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    bajaLogica: false,
    tipoUsuario: 0
  };


  constructor(
    private sharedServ: SharedService,
    public dialogRef: MatDialogRef<AgregareditarcolaboradoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private funcionesGlobalesService: FuncionesGlobalesService
  ) {
    this.colaboradorForm = new FormGroup({
      id: new FormControl(0),
      nombreDeUsuario: new FormControl('', Validators.required),
      pass: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email])
    });
  }
  ngOnInit(): void {
    if (!this.data.soyAgregar) {
      this.cargarDatos(this.data.colaborador);
    }
  }
  private cargarDatos(colaborador: DTOUsuario) {
    this.colaboradorForm.patchValue({
      id: colaborador.idUsuario,
      nombreDeUsuario: colaborador.nombreDeUsuario,
      nombre: colaborador.nombre,
      apellido: colaborador.apellido,
      telefono: colaborador.telefono,
      mail: colaborador.correo
    });
  }
  verificarCamposIncompletos(): string[] {
    const camposIncompletos: string[] = [];
    Object.keys(this.colaboradorForm.controls).forEach(key => {
      if (this.colaboradorForm.controls[key].invalid) {
        camposIncompletos.push(key);
      }
    });
    return camposIncompletos;
  }

  validandoForm(): boolean {
    let esValido = false;
    if (this.colaboradorForm.valid) {
      esValido = true;
    }
    return !esValido;
  }
  private mostrarError() {

  }


  realizarAccion() {
    this.colaborador.nombre = this.colaboradorForm.get('nombre')?.value;
    this.colaborador.apellido = this.colaboradorForm.get('apellido')?.value;
    this.colaborador.telefono = this.colaboradorForm.get('telefono')?.value;
    this.colaborador.correo = this.colaboradorForm.get('mail')?.value;
    this.colaborador.nombreDeUsuario = this.colaboradorForm.get('nombreDeUsuario')?.value;
    if (!this.data.soyAgregar) {
      this.colaborador.idUsuario = this.colaboradorForm.get('id')?.value;
      this.colaborador.contrasenia = this.colaboradorForm.get('pass')?.value;
      this.colaborador.tipoUsuario = this.data.colaborador.tipoUsuario;

      this.editar();
    } else {
      this.alta();
    }
  }
  private alta() {
    this.sharedServ.altaColaborador(this.colaborador)
      .subscribe({
        next: (resultadoAlta) => {
          if (resultadoAlta) {
            this.formatearColaborador();
            this.dialogRef.close({ result: resultadoAlta, error: "Alta exitosa" });
          } else {
            this.dialogRef.close({ result: resultadoAlta, error: "No se pudo realizar el alta" });
          }
        },
        error: (error) => {
          this.dialogRef.close({ result: error, error: "No se pudo realizar el alta" });
        }
      });
  }
  private editar() {
    this.sharedServ.modificarColaborador(this.colaborador)
      .subscribe({
        next: (resultadoEdit) => {
          if (resultadoEdit) {
            this.formatearColaborador();
            this.dialogRef.close({ result: resultadoEdit, error: "Modificado correctamente" });
          } else {
            this.dialogRef.close({ result: resultadoEdit, error: "No se pudo modificar correctamente" });
          }
        },
        error: (error) => {
          console.log(error.error);
          let er = 'No se pudo modificar el colaborador';
          if (error == "Contrasenia invalida") er = 'Contraseña invalida'
          this.dialogRef.close({ result: error, error: er });
        }
      });

  }

  private formatearColaborador() {
    this.colaborador = {
      idUsuario: 0,
      nombreDeUsuario: '',
      contrasenia: '',
      nombre: '',
      apellido: '',
      telefono: '',
      correo: '',
      bajaLogica: false,
      tipoUsuario: 0
    };

  }

}
