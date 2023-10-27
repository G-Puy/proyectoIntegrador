import { Component } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-nav-bar-global-empresa',
  templateUrl: './nav-bar-global-empresa.component.html',
  styleUrls: ['./nav-bar-global-empresa.component.css']
})
export class NavBarGlobalEmpresaComponent {
  public subscriber: Subscription = new Subscription;
  constructor(private router: Router) { }
  queMuestro: string = "/login";
  icono: string = "account_circle";
  ngOnInit() {
    this.subscriber = this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.queMuestro = event.url;
      console.log(event.url);



      //this.icono = "arrow_back_ios";
      /* if (event.url == "/lEmpresa") {
        this.icono = "account_circle";
      } else {
        this.icono = "arrow_back_ios";
      } */
    });
  }


  //En el onDestroy, valido si mi subscriber sigue activo y me desuscribo, si no seguirá activo escuchando cuando navegues a otro componente donde no lo requieras.
  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }

  private RutaAnterior() {



  }



}
