import { Component } from '@angular/core';
import { DTOUsuario } from 'src/app/interfaces/usuario.interfce';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent {
  colaboradores: DTOUsuario[] = [];

}
