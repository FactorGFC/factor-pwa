import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGES_ROUTES } from './pages-routing.module';

// import { PagesRoutingModule, PAGES_ROUTES } from './pages-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PAGES_ROUTES
    // PagesRoutingModule
  ]
})
export class PagesModule { }
