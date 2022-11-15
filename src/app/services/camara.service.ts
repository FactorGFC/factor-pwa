import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map, timeout } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  videoNode;
  stream;
  token: string;
  usuario: Usuario;

  constructor(
    public http: HttpClient
  ) {
    this.cargarStorage();
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  abrirCamara(){
    
    navigator.mediaDevices.enumerateDevices().then(devices => {
      let device = devices.find(d => d.kind == 'videoinput' && d.label.includes('back'));
      let deviceId = '';
      if(!device){
        device = devices.find(d => d.kind == 'videoinput');
      }
      deviceId = device.deviceId;
      let constraints = {
        audio: false,
        video: {
          // width: 100%,
          // height: 100%,
          // width: {
          //   min: 640,
          //   ideal: 960,
          //   max: 1280,
          // },
          // height: {
          //   min: 360,
          //   ideal: 540,
          //   max: 720
          // },
          deviceId: {
            exact: deviceId
          }
        }
      }
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        this.videoNode = document.getElementById('player');
        this.videoNode.srcObject = stream;
        this.stream = stream;
        // console.log('test', this.videoNode.videoHeight, this.videoNode.videoWidth)
        // let height = this.videoNode.videoHeight / (this.videoNode.videoWidth/320);
        // this.videoNode.setAttribute('width', 320);
        // this.videoNode.setAttribute('height', height);
    });

    })
  }

  cerrarCamara(){
    this.videoNode.pause();

    if(this.stream){
        this.stream.getTracks()[0].stop();
    }
  }

  tomarFoto(){

    let canvas = document.createElement('canvas');

    canvas.setAttribute('width', '300');
    canvas.setAttribute('height', '300');

    let context = canvas.getContext('2d');

    context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);

    var foto = context.canvas.toDataURL();

    canvas = null;
    context = null;

    return foto;

}

subirFoto(params){
  params.token = this.token;
  params.secret_key = environment.SECRET_KEY;
  // console.log(params);
  console.log(params);
  const url = `${environment.URL_SERVICIOS}/document_shots?`;

  return this.http.post( url, params ).pipe(
              map( (resp: any) => {
                // console.log(resp);
                return resp //this.crearArreglosimul(resp);
              }));
}


}
