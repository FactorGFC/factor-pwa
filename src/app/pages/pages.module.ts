import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGES_ROUTES } from './pages-routing.module';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

// import { PagesRoutingModule, PAGES_ROUTES } from './pages-routing.module';
import { AltasolicitudesComponent } from './altasolicitudes/altasolicitudes.component';
import { AltaFacturasComponent } from './alta-facturas/alta-facturas.component';
import { HttpClientModule } from '@angular/common/http';
import { OptionsService } from '../services/options/options.service';
import { AltaSolicitudesService } from '../services/altasolicitudes/altasolicitudes.service';
import { ContribuyentesService } from '../services/contribuyentes/contribuyentes.service';
import { MantenimientoContribuyentesService } from '../services/mantenimientocontribuyentes/mantenimientocontribuyentes.service';
import { UserOptionsService } from '../services/options/userOptions.service';
import { ReportesService } from '../services/reportes/reportes.service';
import { UsuarioService } from '../services/usuario/usuario.service';
import { CamaraService } from '../services/camara.service';
import { PagesComponent } from './pages.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AltasolicitudesComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PAGES_ROUTES
    // PagesRoutingModule
  ],
  providers: [
    AltaSolicitudesService,
    ContribuyentesService,
    OptionsService,
    MantenimientoContribuyentesService,
    OptionsService,
    UserOptionsService,
    ReportesService,
    UsuarioService,
    CamaraService
  ]
})
export class PagesModule { }
