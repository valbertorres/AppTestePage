import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { UsuarioModel } from '../models/usuario.model';

@Injectable()
export class UsuarioService{

    usuarioChange = new  Subject<UsuarioModel[]>();
    usuarios : UsuarioModel[] =[];

    getUsuarios(){
        return this.usuarios.slice();
    }

    setUsuarios(usuario : UsuarioModel){
        this.usuarios.push(usuario);
        this.usuarioChange.next(this.usuarios.slice());
    }
}