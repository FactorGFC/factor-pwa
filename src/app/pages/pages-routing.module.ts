import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaFacturasComponent } from './alta-facturas/alta-facturas.component';
import { LoginGuard } from '../services/guards/login.guard';
import { AltasolicitudesComponent } from './altasolicitudes/altasolicitudes.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent, 
    canActivate: [ LoginGuard ],
    children: [
      { path: 'alta', component: AltaFacturasComponent, data: { titulo: 'Alta facturas' } },
      { path: 'altaSolicitudes', component: AltasolicitudesComponent, data: { titulo: 'Alta Solicitud' } },
      { path: '', redirectTo: '/alta', pathMatch: 'full' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild( routes );

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class PagesRoutingModule { }
