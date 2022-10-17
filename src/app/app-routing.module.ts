import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetpswdComponent } from './login/resetpswd/resetpswd.component';

const routes: Routes = [
  { path: 'login',          component: LoginComponent },
  { path: 'resetpwd/:token', component: ResetpswdComponent },
  { path: '**', redirectTo: 'login' },
];

export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
