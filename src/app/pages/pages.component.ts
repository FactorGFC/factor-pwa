import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  logout(){
    this._usuarioService.logout();
  }

}
