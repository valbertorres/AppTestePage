import { Injectable } from '@angular/core';
import { Headers, Http, Response ,RequestOptions,Jsonp, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

// class
import { DadosCnpj } from '../models/dados-cnpj.model';


@Injectable()
export class CadastroService{

    constructor(
         private http : Http,
         private jsonp: Jsonp
         ){}

    private urlIP ="https://api.ipify.org/?format=json";
    private urlCep ='https://viacep.com.br/ws/cepAll/xml/';
    private urlWebServiceCnpj = "https://www.receitaws.com.br/v1/cnpj/25180213000173"

    getIP(){ 
        return this.http.get(this.urlIP)
        .map(
            (res : Response)=>{
               const t : any [] = res.json();
               return t;
            }
        )
    }

    getCep(cep : string) {
        
            return this.http.get("https://viacep.com.br/ws/"+cep+"/xml/")
            .map(
                (res : Response)=>{
                    return  res.text();
                }
            )
            .catch(
                (error : Response)=>{
                    return Observable.throw(error);
                }
            )
        
    }

    getCnpjWebService(){
        let params = new URLSearchParams();
        params.set('callback', 'JSONP_CALLBACK');
        return  this.jsonp
       .get(this.urlWebServiceCnpj,{search:params})
       .map(
           (res : Response)=>{
              const data : DadosCnpj = res.json();
              return data
           }
       )
    }


    
}