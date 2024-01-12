import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.css']
})
export class FailureComponent implements OnInit {

  idVenta: number = 0;
  constructor(private sharedService: SharedService) {
  }
  ngOnInit(): void {
    this.idVenta = Number(this.sharedService.obtenerIdVenta());
    if (this.idVenta != null && this.idVenta > 0) {
      this.sharedService.cancelarCompra(this.idVenta).subscribe({
        next: (response) => {
          if (response == true) {
            this.sharedService.eliminarIdVenta();
            this.sharedService.vaciarCarrito();
          }
        },
        error: (error) => {

        }
      });
    }
  }
}
