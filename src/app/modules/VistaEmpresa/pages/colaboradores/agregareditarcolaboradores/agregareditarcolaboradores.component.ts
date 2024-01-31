import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DTOUsuario } from 'src/app/interfaces/usuario.interfce';

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
    public dialogRef: MatDialogRef<AgregareditarcolaboradoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.colaboradorForm = new FormGroup({
      id: new FormControl(0),
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

}
