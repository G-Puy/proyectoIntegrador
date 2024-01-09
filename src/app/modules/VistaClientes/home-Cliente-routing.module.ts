import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeClientesComponent } from './pages/home-cliente/home.component';
import { LayoutClientesComponent } from "./pages/layout-clientes/layout-clientes.component";
import { TodoslosproductosComponent } from "./pages/todoslosproductos/todoslosproductos.component";
import { PagosComponent } from "./pages/pagos/pagos.component";
import { SuccessComponent } from "./pages/pagos/paginasredireccionpagos/success/success.component";
import { PendingComponent } from "./pages/pagos/paginasredireccionpagos/pending/pending.component";
import { FailureComponent } from "./pages/pagos/paginasredireccionpagos/failure/failure.component";


const routes: Routes = [
    {
        path: '',
        component: LayoutClientesComponent,
        children: [
            { path: '', component: HomeClientesComponent },
            { path: 'productos', component: TodoslosproductosComponent },
            { path: 'pagos', component: PagosComponent },
            { path: 'success', component: SuccessComponent },
            { path: 'failure', component: FailureComponent },
            { path: 'pending', component: PendingComponent },
            { path: '**', redirectTo: '' }
        ]
    }
];
@NgModule({

    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeClienteModuleRoutingModule { }