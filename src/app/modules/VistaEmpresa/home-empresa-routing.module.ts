import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeEmpresaComponent } from "./pages/home-empresa/home-empresa.component";
import { ProductosComponent } from './pages/productos/productos.component';
import { LayoutEmpresaComponent } from "./pages/layout-empresa/layout-empresa.component";
import { AgregarModificarProductoComponent } from "./pages/productos/agregar-modificar-producto/agregar-modificar-producto.component";
import { LoginComponent } from "../auth/pages/login/login.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutEmpresaComponent,
        children: [
            { path: '', component: HomeEmpresaComponent },
            { path: 'productos', component: ProductosComponent },
            { path: 'productos/amp', component: AgregarModificarProductoComponent },// AMP = Agregar Modificar Producto
            { path: '**', redirectTo: '' }
        ]
    }
];
@NgModule({

    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeEmpresaModuleRoutingModule { }