import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  overlayRef: OverlayRef | undefined;
  constructor(public oaverlayRef: Overlay) { }
  @Output() cerrarOverlay: EventEmitter<void> = new EventEmitter<void>();
  cerrar() {
    this.cerrarOverlay.emit();
    // this.overlayRef?.detach();
  }
}