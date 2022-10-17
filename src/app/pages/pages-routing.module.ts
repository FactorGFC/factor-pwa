import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaFacturasComponent } from './alta-facturas/alta-facturas.component';
import { LoginGuard } from '../services/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    // component: PagesComponent, 
    canActivate: [ LoginGuard ],
    children: [
      { path: 'alta', component: AltaFacturasComponent, data: { titulo: 'Alta facturas' } }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild( routes );

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class PagesRoutingModule { }
