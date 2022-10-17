import { Component, OnInit } from '@angular/core';
import { CamaraService } from '../../services/camara.service';

@Component({
  selector: 'app-alta-facturas',
  templateUrl: './alta-facturas.component.html',
  styleUrls: ['./alta-facturas.component.css']
})
export class AltaFacturasComponent implements OnInit {

  constructor(private camaraService:CamaraService) { }

  ngOnInit(): void {
  }

  abrirCamara(){
    this.camaraService.abrirCamara();
  }

  tomarFoto(){
    this.camaraService.tomarFoto();//Esto regresa la base 64 de la foto

    
    this.camaraService.cerrarCamara();
  }

}
