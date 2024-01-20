import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent {
  constructor(private router: Router) {

  }
  navegarAHome() {
    this.router.navigate(['store']);
  }
}
