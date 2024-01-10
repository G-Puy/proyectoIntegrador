import { Component } from '@angular/core';
import { NavigationEnd, Router, Event, ActivatedRoute } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Location } from '@angular/common';
import { PerfilPersonaComponent } from '../pages/perfil-persona/perfil-persona.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-nav-bar-global-empresa',
  templateUrl: './nav-bar-global-empresa.component.html',
  styleUrls: ['./nav-bar-global-empresa.component.css']
})
export class NavBarGlobalEmpresaComponent {
  private subscription: Subscription
  public subscriber: Subscription = new Subscription;
  constructor(private router: Router,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog) {
    this.subscription = new Subscription();
  }
  icono: string = "account_circle";
  mostrarRuta: string = "/lEmpresa";

  ngOnInit() {
    this.analizarRutas(this.router.url);
    this.subscription = this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.mostrarRuta = event.url;
      this.analizarRutas(this.mostrarRuta);
    });
  }
  private analizarRutas(rutaActual: string) {
    if (rutaActual == "/lEmpresa") this.icono = "account_circle";
    else this.icono = "arrow_back_ios";
  }

  ngOnDestroy(): void {
    // Asegúrate de desuscribirte para evitar fugas de memoria
    this.subscription.unsubscribe();
  }

  logOut() {
    this.auth.logOut();
    this.router.navigate(['/auth/login']);
  }

  action() {
    this.mostrarRuta = this.router.url;
    switch (this.mostrarRuta) {
      case "/lEmpresa":
        this.openDialogPerfil();
        break;
      default:
        if (this.mostrarRuta !== "/lEmpresa") this.location.back();
        break;
    }
  }
  goBack(): void {
    this.location.back();
  }
  openDialogPerfil() {
    const dialogRef = this.dialog.open(PerfilPersonaComponent, {
      width: '500px',
      data: {},
      disableClose: true
    });
  }

}
