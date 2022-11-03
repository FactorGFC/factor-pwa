import { Component, OnInit } from '@angular/core';
import { CamaraService } from '../../services/camara.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal2 from 'sweetalert2';
import { AltaSolicitudesService } from '../../services/altasolicitudes/altasolicitudes.service';

@Component({
  selector: 'app-alta-facturas',
  templateUrl: './alta-facturas.component.html',
  styleUrls: ['./alta-facturas.component.css']
})
export class AltaFacturasComponent implements OnInit {

  tomada = false;
  foto;
  idu = localStorage.getItem('id');
  company = '';

  constructor(private camaraService:CamaraService,
              private _usuarioService: UsuarioService,
              private _solicitudesservice: AltaSolicitudesService) { }

  ngOnInit(): void {
    this.abrirCamara();

    this._solicitudesservice.getCadenaProveedor(this.idu).subscribe( resp => {
      if (resp.length > 0) {
        this.company= resp[0].company_id;
      }
    });
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
    this.tomada = false;
  }

  subirFoto(){
    if(this.company == '') {
      swal2.fire('Atención', 'El usuario no está asignado a una compañía', 'info');
      return;
    }
      let params = {};
      let document_shot = {
        document_id: '',
        notes: '',
        shot: this.foto,
        company_id: this.company,
        status: 'PENDIENTE'
      }
      params['document_shot'] = document_shot;
      this.camaraService.subirFoto(params).subscribe(resp => {
        swal2.fire('Éxito', 'Imagen enviada correctamente', 'success');
        this.abrirCamara();
        this.tomada = false;
      }, err => {
        let error = '';
        err.error.errors.forEach(e => {
          error += e;
          error += '<br>';
        });
        swal2.fire('Atención', error, 'info');
      })

  }

}
