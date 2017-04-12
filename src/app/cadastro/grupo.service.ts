import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { GrupoModel } from '../models/grupo.model';

@Injectable()
export class GrupoService{

    grupoChange = new Subject<GrupoModel[]>();

    grupo :GrupoModel[] =[];

    setGrupo(grupo : GrupoModel){
        this.grupo.push(grupo);
        this.grupoChange.next(this.grupo.slice());
    }

    getGrupo(){
        return this.grupo.slice();
    }
}