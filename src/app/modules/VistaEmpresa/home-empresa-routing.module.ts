import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeEmpresaComponent } from "./pages/home-empresa/home-empresa.component";
import { ProductosComponent } from './pages/productos/productos.component';
import { LayoutEmpresaComponent } from "./pages/layout-empresa/layout-empresa.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutEmpresaComponent,
        children: [
            { path: 'productos', component: ProductosComponent },
            { path: '', component: HomeEmpresaComponent },
            { path: '**', redirectTo: '' }
        ]
    }
];
@NgModule({

    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeEmpresaModuleRoutingModule { }