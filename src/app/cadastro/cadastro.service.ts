import { Injectable } from '@angular/core';
import { Headers, Http, Response ,RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { ProdutoService } from './produto.service';
import { ProdutoModel } from '../models/produto.model';

@Injectable()
export class CadastroService{

    private url = "https://intersys-c915f.firebaseio.com/produto.json";
    private urlAppName = 'https://intersys-c915f.firebaseio.com/appName.json';
    private urlSys ='http://186.202.61.22:8135/AUDSPED/AUDITORIA/TpVOcadcli/VOcadcli'; 

    constructor(
        private http: Http,
        private produtoService : ProdutoService
    ){}
       
       headers = new  Headers({
            'Content-Type':'appliccation/json'
       });

    onSave(){
       return this.http.put(this.url, this.produtoService.getProduto(), {headers: this.headers});
    }

    getAll(){
        return this.http.get(this.url)
        .map(
            (res : Response)=>{
            const produtos : ProdutoModel[] = res.json();
            return produtos
        })
        .subscribe(
            (produto : ProdutoModel[])=>{
                this.produtoService.setProduto(produto);
            }
        )
    }

    
//         create(): Observable<any> {
//      let s =  {
//         "type": "VOcadcli_usuarios.TVOcadcli_usuarios",
//         "id": 1,
//         "fields": {
//           "cucpf": "469.562.121-13",
//           "cuemail": "VALBErrrrR",
//           "cufone": "(62)3247-1560",
//           "cuformapag": 0,
//           "cuid_cliente": 30,
//           "cunome": "LINDOMAR",
//           "cuobs": "",
//           "cusenha": "123",
//           "cuseq": 1,
//           "cuwatszapp": "",
//           "pdatabase": ""
//         }
//       };
//      let urlInter = 'http://186.202.61.22:8135/datasnap/rest/service/cliente/';
//      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlecoded'});
//      let options = new RequestOptions({ headers: headers });

//            console.log("teste");        
//     return this.http.post(urlInter, JSON.stringify(s) , options)
//   }

    
    

    getAppName(){
        return this.http.get(this.urlAppName)
        .map(
            (res: Response)=>{
                return res.json();
            }
        )
    }

private urlXml = "http://186.202.61.22:8135/datasnap/rest/service/leituragenerica_xml/1/select CRAZSOC,CID,cperiodo_dtfin,cperiodo_dtini , case when cserv_analise_balanco='S' then 'Analise de Balanco' else '' end as analisebabalanco , case when cserv_auditar_estoque='S' then 'Auditar estoque' else '' end as auditarestoque , case when cserv_comparativo_fiscalxcontabil='S' then 'Comparativo Fiscal x Contabil' else '' end as comparativofiscalxcontabil FROM cadcli where ccnpj = '05.888.347%2F0040-11'";

    teste(){
      
       return this.http.get(this.urlXml)
        .map(
            (res : Response)=>{
              const xml:any[] = res.json().result[0];
              return xml;
            }
        )
      
    }

             d(){
                        var urlXml = "http://186.202.61.22:8135/datasnap/rest/service/leituragenerica_xml/1/select CRAZSOC,CID,cperiodo_dtfin,cperiodo_dtini , case when cserv_analise_balanco='S' then 'Analise de Balanco' else '' end as analisebabalanco , case when cserv_auditar_estoque='S' then 'Auditar estoque' else '' end as auditarestoque , case when cserv_comparativo_fiscalxcontabil='S' then 'Comparativo Fiscal x Contabil' else '' end as comparativofiscalxcontabil FROM cadcli where ccnpj = '05.888.347%2F0040-11'";
                            
                        var xml = new XMLHttpRequest();

                        xml.onreadystatechange = function() {
                            if (xml.readyState === 4) {
                             document.getElementById("teste").innerHTML = xml.responseText
                            }
                        }

                        xml.open('GET', urlXml, false);
                        xml.send('');
            }
   

}