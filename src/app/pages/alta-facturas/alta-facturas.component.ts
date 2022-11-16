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
  elemento; 
  src = '/assets/images/noimage.jpg';
  defaultsrc = '/assets/images/noimage.jpg';

  constructor(private camaraService:CamaraService,
              private _usuarioService: UsuarioService,
              private _solicitudesservice: AltaSolicitudesService) { }

  ngOnInit(): void {
    // this.abrirCamara();

    this._solicitudesservice.getCadenaProveedor(this.idu).subscribe( resp => {
      if (resp.length > 0) {
        this.company= resp[0].company_id;
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.camaraService.cerrarCamara();
  }

  abrirCamara(){
    this.foto = '';    
    this.camaraService.abrirCamara();
    
  }

  tomarFoto(){
    document.getElementById('cam').click();
    /* 
    VERSION SIN CAMARA NATIVA


    this.tomada = true;

    this.foto = this.camaraService.tomarFoto();//Esto regresa la base 64 de la foto
    this.camaraService.cerrarCamara(); */
  }

  logout(){
    this._usuarioService.logout();
  }

  cancelar(){
    // this.abrirCamara();
    this.tomada = false;
    document.getElementById('img').setAttribute('src', this.defaultsrc);
  }

  comprimirImagen(imagenComoArchivo, porcentajeCalidad){
		return new Promise((resolve, reject) => {
			const $canvas = document.createElement("canvas");
			const imagen = new Image();
			imagen.onload = () => {
				$canvas.width = imagen.width;
				$canvas.height = imagen.height;
				$canvas.getContext("2d").drawImage(imagen, 0, 0);
				$canvas.toBlob(
					(blob) => {
						if (blob === null) {
							return reject(blob);
						} else {
							resolve(blob);
						}
					},
					"image/jpeg",
					porcentajeCalidad / 100
				);
			};
			imagen.src = URL.createObjectURL(imagenComoArchivo);
		});
	};

  async camara(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    let img = '';

    var resizedImage;

    // Read in file
    var file = element.files[0];

    // Ensure it's an image
    if(file.type.match(/image.*/)) {
        console.log('An image has been loaded');

        // Load the image
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var image = new Image();
            image.onload = function (imageEvent) {

                // Resize the image
                var canvas = document.createElement('canvas'),
                    max_size = 1200,
                    width = image.width/3,
                    height = image.height/3;
                // if (width > height) {
                //     if (width > max_size) {
                //         height *= max_size / width;
                //         width = max_size;
                //     }
                // } else {
                //     if (height > max_size) {
                //         width *= max_size / height;
                //         height = max_size;
                //     }
                // }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                resizedImage = canvas.toDataURL('image/jpeg');
                img = resizedImage;
                localStorage.setItem('cam', img);
                document.getElementById('img').setAttribute('src', img);
            }
            image.src = readerEvent.target.result.toString();
        }
        reader.readAsDataURL(file);
      }
      this.foto = img;
      this.tomada = true;

    /*
    
    hace pequeño pero falla lo del blob
    
    const blob = await this.comprimirImagen(element.files[0], 30);
    var url = URL.createObjectURL(blob);
    console.log('pup', blob); */

    

    // es el que esta funcionando, con problemas de tamaño
    
    /* let img = '';

    var reader = new FileReader();
    reader.readAsDataURL(element.files[0]);
    reader.onload = function () {
      // console.log(reader.result);
      img = reader.result.toString();
      localStorage.setItem('cam', img);
      document.getElementById('img').setAttribute('src', img);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

    // this.camaraService.cerrarCamara();
    this.foto = img;
    this.tomada = true; */
  }

  subirFoto(){
    this.foto = localStorage.getItem('cam');
    localStorage.removeItem('cam');
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
        // this.abrirCamara();
        document.getElementById('img').setAttribute('src', this.defaultsrc);
        this.tomada = false;
      }, err => {
        console.log(err);
        let error = '';
        try{
          err.error.errors.forEach(e => {
            error += e;
            error += '<br>';
          });
          swal2.fire('Atención', error, 'info');
        }
        catch{
          swal2.fire('Atención', 'Ha ocurrido un error, contacte al Administrador', 'info');
        }
      })

  }

}
