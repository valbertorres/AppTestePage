import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { FieldsService } from './fields.service';
import { Result } from '../models/result.models';
import { ResultService } from './result.service';

@Injectable()
export class DataStorageService{
    private urlGet = 'http://186.202.61.22:8135/datasnap/rest/service/cliente/audsped0001/1/500//0//';
    private urlCad = 'http://186.202.61.22:8135/datasnap/rest/service/cliente/';
    private urlCli = 'http://186.202.61.22:8135/datasnap/rest/service/cadcli_usuarios/';

    private urlFarebase ='https://intersys-c915f.firebaseio.com/rsult.json';

    constructor(
        private http : Http,
        private fieldsService : FieldsService,
        private resultService : ResultService
    ){}
    // cabeçario de de put ou post
     headers = new Headers({
        'Content-type':'application/json'
    });

    // busca todos os dados no banco de cadastro de cliente
    getAll(){
        return this.http.get(this.urlGet)
        .map(
            (res : Response)=>{
                // busco todos os result que estão no banco
                const result : Result[] = res.json().result[0]
                return result;
            }
        )
        .subscribe(
            (result : Result[])=>{
                this.resultService.setResult(result);
                // busco todos os fields que estão no banco
                for(let r of result){
                    this.fieldsService.setFields(r.fields);
                }
            }
        )
    }

    setStorage(){
        return this.http.put(this.urlFarebase, this.resultService.gerResult(),{headers : this.headers})
        .subscribe(
            (res:Response)=>{
                console.log(res);
            }
        )
    }
    

}