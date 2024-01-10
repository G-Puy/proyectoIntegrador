import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeEmpresaComponent } from "./pages/home-empresa/home-empresa.component";
import { ProductosComponent } from './pages/productos/productos.component';
import { LayoutEmpresaComponent } from "./pages/layout-empresa/layout-empresa.component";
import { AgregarModificarProductoComponent } from "./pages/productos/agregar-modificar-producto/agregar-modificar-producto.component";
import { LoginComponent } from "../auth/pages/login/login.component";
import { TipoProductoComponent } from "./pages/tipo-producto/tipo-producto.component";
import { ColorComponent } from "./pages/colores/color.component";
import { TallesComponent } from "./pages/talles/talles.component";
import { StocksComponent } from "./pages/stocks/stocks.component";
import { BandejastockComponent } from "./pages/bandejastock/bandejastock.component";
import { BandejaventasComponent } from "./pages/bandejaventas/bandejaventas.component";
import { ColaboradoresComponent } from "./pages/colaboradores/colaboradores.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutEmpresaComponent,
        children: [
            { path: '', component: HomeEmpresaComponent },
            { path: 'productos', component: ProductosComponent },
            { path: 'productos/amp', component: AgregarModificarProductoComponent },// AMP = Agregar Modificar Producto
            { path: 'tipoProductos', component: TipoProductoComponent },
            { path: 'colores', component: ColorComponent },
            { path: 'talles', component: TallesComponent },
            { path: 'stocks', component: StocksComponent },
            { path: 'bandejaStocks', component: BandejastockComponent },
            { path: 'bandejaVentas', component: BandejaventasComponent },
            { path: 'colaboradores', component: ColaboradoresComponent },
            { path: '**', redirectTo: '' }
        ]
    }
];
@NgModule({

    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeEmpresaModuleRoutingModule { }