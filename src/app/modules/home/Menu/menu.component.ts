import { OverlayRef } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  overlayRef!: OverlayRef; // Declara la propiedad overlayRef

  constructor() { }

}
