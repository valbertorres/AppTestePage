import { Injectable} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { GrupoModel } from '../models/grupo.model';

@Injectable()
export class GrupoService{

    grupoChange = new Subject<GrupoModel[]>();
    grupo : GrupoModel[] =[];
    grupoCod : GrupoModel;      

    setGrupo( grupo : GrupoModel[]){
        this.grupo = grupo;
        this.grupoChange.next(this.grupo.slice());
    }

    setGrupoCod(grupo : GrupoModel){
        this.grupoCod = grupo;
        return this.grupoCod;
    }

}