import { Component, OnInit } from '@angular/core';
import { CamaraService } from '../../services/camara.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-alta-facturas',
  templateUrl: './alta-facturas.component.html',
  styleUrls: ['./alta-facturas.component.css']
})
export class AltaFacturasComponent implements OnInit {

  tomada = false;
  foto;

  constructor(private camaraService:CamaraService,
              private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.abrirCamara();
  }

  abrirCamara(){
    this.foto = '';
    this.camaraService.abrirCamara();
  }

  tomarFoto(){
    this.tomada = true;

    this.foto = this.camaraService.tomarFoto();//Esto regresa la base 64 de la foto
    
    this.camaraService.cerrarCamara();
  }

  logout(){
    this._usuarioService.logout();
  }

  cancelar(){
    this.abrirCamara();

  }

  subirFoto(){
    console.log(this.foto);
  }

}
