import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-perfil-persona',
  templateUrl: './perfil-persona.component.html',
  styleUrls: ['./perfil-persona.component.css']
})
export class PerfilPersonaComponent {
  username: string = "";
  pass: string = "";
  pass1: string = "";
  pass2: string = "";
  errorValidacionPassass: string = "";
  constructor(private sharedServ: SharedService,) {
    this.username = this.sharedServ.obtenerUsernameLogeado();
  }
}
