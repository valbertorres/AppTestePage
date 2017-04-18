import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

// import as class
import { Fields } from '../models/fields.model';
import { Result } from '../models/result.models';
import { UsuarioResult } from '../models/usuario.result.models';
import { UsuarioModel } from '../models/usuario.model'

// import services
import { FieldsService } from '../result/fields.service';
import { UsuarioService } from '../result/usuario.service';

@Injectable()
export class LoginDataService{

    // url de selct xml do banco
    private urlCnnpj = "http://186.202.61.22:8135/datasnap/rest/service/leituragenerica_xml/1/select "
    +" CRAZSOC,CID,cperiodo_dtfin,cperiodo_dtini , case when cserv_analise_balanco='S' then 'Analise "
    +" de Balanco' else '' end as analisebabalanco , case when cserv_auditar_estoque='S' then 'Auditar"
    +" estoque' else '' end as auditarestoque , case when cserv_comparativo_fiscalxcontabil='S' then"
    +" 'Comparativo Fiscal x Contabil' "
    +"else '' end as comparativofiscalxcontabil FROM cadcli where ccnpj = ";

    // select dos dados de cnpj
    private urlGetAll = 'http://186.202.61.22:8135/datasnap/rest/service/cliente/audsped0001/1/500//0//';
    private urlUsuario = 'http://186.202.61.22:8135/datasnap/rest/service/cadcli_usuarios/audsped0001/1/500/0/0';


    constructor(
        private fieldsService : FieldsService,
        private http : Http,
        private usuarioService : UsuarioService
    ){}

    private usuarios : UsuarioModel[]=[];
    private fields : Fields[]=[];

    // busca o xml do banco 
    onGet(cnpj :string){
        let ccnpj = this.urlCnnpj+"'"+cnpj+"'";
        
        return this.http.get(ccnpj)
        .map(
            (res : Response)=>{
                const data = res.json().result[0]
                return data;
            }
        ).catch(
            (error : Response)=>{
                console.log(error);
                return Observable.throw(error);
            }
        )
    }

    // get dos dados do banco
    onGetAll(){
        return this.http.get(this.urlGetAll)
        .map(
            (res : Response)=>{
                 const dados = res.json().result[0];
                for(let dado of dados){
                    this.fields.push(dado.fields);
                }
                return this.fields;
            }
        ).catch(
            (error : Response)=>{
                console.log(error);
                return Observable.throw(error);
            }
        )
    }

// busco todos os usuarios no banco
    onGerUsuario(){
        return this.http.get(this.urlUsuario)
        .map(
            (res : Response)=>{
                const data : UsuarioResult[] = res.json().result[0];
                for(let dados of data){
                   this.usuarios.push(dados.fields);
                }
                return this.usuarios;
            }
        ).catch(
            (error : Response)=>{
                console.log(error);
                return Observable.throw(error);
            }
        )
    }
}