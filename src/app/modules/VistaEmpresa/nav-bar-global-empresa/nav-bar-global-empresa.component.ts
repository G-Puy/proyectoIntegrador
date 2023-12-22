import { Component } from '@angular/core';
import { NavigationEnd, Router, Event, ActivatedRoute } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Location } from '@angular/common';
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
    private location: Location) {
    this.subscription = new Subscription();
  }
  icono: string = "account_circle";
  mostrarRuta: string = "/lEmpresa";

  ngOnInit() {
    this.subscription = this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.mostrarRuta = event.url;
      if (this.mostrarRuta == "/lEmpresa") this.icono = "account_circle";
      else this.icono = "arrow_back_ios";
      //console.log(this.mostrarRuta);
    });
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
    switch (this.mostrarRuta) {
      case "lEmpresa":
        // this.router.navigate(['/lEmpresa']); //Aca tiene que ser al perfil personal.

        break;
      default:
        if (this.mostrarRuta !== "/lEmpresa") this.location.back();
        break;
    }
  }
  goBack(): void {
    this.location.back();
  }

}
