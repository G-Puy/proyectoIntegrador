// pagos.component.ts
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

declare var MercadoPago: any;

interface PreferenceResponse {
  preferenceId: string;
}

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  orderData = {
    productTitle: '',
    quantity: 1,
    unitPrice: 0
  };

  constructor(private sharedServices: SharedService) { }

  ngOnInit(): void { }
  processPayment() { }
  // processPayment(): void {
  //   this.sharedServices.createPreference(this.orderData)
  //     .subscribe((response: PreferenceResponse) => {
  //       new MercadoPago('TU_PUBLIC_KEY', {
  //         locale: 'es-UY'
  //       }).checkout({
  //         preference: {
  //           id: response.preferenceId
  //         },
  //         autoOpen: true
  //       });
  //     });
  // }
}