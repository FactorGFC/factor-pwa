import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal2 from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
// import { environment } from '../../environments/environment';
import { UsuarioService } from '../services/usuario/usuario.service';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;
  recuperacont = false;
  auth2: any;
  usuarios: any[] = [];
  imagen: string;
  constructor(
    public router: Router,
    private _usuarioService: UsuarioService
    // private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    // init_plugins();
    this.imagen = environment.CLIENTE;
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }

  }

  recuperarcont() {
    this.recuperacont = !this.recuperacont;
    console.log(this.recuperacont);
  }

  ingresar(forma: NgForm) {
    if ( forma.invalid ) {
      return;
    }
    const usuario = new Usuario(null, forma.value.email, forma.value.password );
    this._usuarioService.login( usuario, forma.value.recuerdame )
                  .subscribe( correcto => {
                    console.log('correcto');
                    this.router.navigate(['/alta']);

                }, (err) => {
                  swal2.fire(
                       'Error al Acceder',
                       'Revise su informacion',
                       'error'
                    );
                 }  );

  }

  enviacrecuperacion() {
    const email = (document.getElementById('emailrec') as HTMLInputElement).value;
    this._usuarioService.getResetPaswword(email).subscribe( resp => { this.recuperacont = !this.recuperacont;
                                                                      swal2.fire(
        'El correo de recuperacion de contrase??a fue enviado a:',
        email,
        'success'
     );
    }, (err) => {
      console.log(err);
      swal2.fire(
           'Error',
           err.error.errors[0],
           'error'
        );
     } );

  }

}
