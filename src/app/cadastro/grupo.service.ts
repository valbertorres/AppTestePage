<<<<<<< HEAD
import { Injectable} from '@angular/core';

=======
import { Injectable } from '@angular/core';
>>>>>>> ac3541b8458f16a144019f0c900b4e66bf152ecc
import { Subject } from 'rxjs/Subject';

import { GrupoModel } from '../models/grupo.model';

@Injectable()
export class GrupoService{

    grupoChange = new Subject<GrupoModel[]>();
<<<<<<< HEAD
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

=======

    grupo :GrupoModel[] =[];

    setGrupo(grupo : GrupoModel){
        this.grupo.push(grupo);
        this.grupoChange.next(this.grupo.slice());
    }

    getGrupo(){
        return this.grupo.slice();
    }
>>>>>>> ac3541b8458f16a144019f0c900b4e66bf152ecc
}