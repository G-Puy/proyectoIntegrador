import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeClientesComponent } from './pages/home-cliente/home.component';


const routes: Routes = [
    {
        path: '',
        component: HomeClientesComponent,
    }
];
@NgModule({

    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeClienteModuleRoutingModule { }