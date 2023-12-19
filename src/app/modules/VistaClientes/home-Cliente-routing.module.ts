import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeClientesComponent } from './pages/home-cliente/home.component';
import { LayoutClientesComponent } from "./pages/layout-clientes/layout-clientes.component";
import { TodoslosproductosComponent } from "./pages/todoslosproductos/todoslosproductos.component";


const routes: Routes = [
    {
        path: '',
        component: LayoutClientesComponent,
        children: [
            { path: '', component: HomeClientesComponent },
            { path: 'productos', component: TodoslosproductosComponent },
            { path: '**', redirectTo: '' }
        ]
    }
];
@NgModule({

    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeClienteModuleRoutingModule { }