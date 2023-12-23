import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DTOGenAbms } from 'src/app/interfaces/objGenericoParaABMS.interface';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  overlayRef: OverlayRef | undefined;
  cargaTiposDePrenda: DTOGenAbms[] = [];


  constructor(public oaverlayRef: Overlay,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private sharedServ: SharedService,
    private funcionesGlobalesService: FuncionesGlobalesService,
    private router: Router) {


    this.sharedServ.getAllTipoPrendas().subscribe(tp => {
      this.cargaTiposDePrenda = tp;
    });

  }
  @Output() cerrarOverlay: EventEmitter<void> = new EventEmitter<void>();

  cerrar() {
    this.cerrarOverlay.emit();
    // this.overlayRef?.detach();
  }
  redirigirATodosLosProductos(categoria: string, tipoAccion: string) {
    this.cerrar();
    this.sharedServ.cargarDatosParaTodosLosProductos(categoria, tipoAccion);
  }









}