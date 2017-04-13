import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { ProdutoService } from './produto.service';
import { ProdutoModel } from '../models/produto.model';

@Injectable()
export class CadastroService{

    private url = "https://intersys-c915f.firebaseio.com/produto.json";
    private urlAppName = 'https://intersys-c915f.firebaseio.com/appName.json';
    //private urlSys ='http://186.202.61.22:8135/AUDSPED/AUDITORIA/TpVOcadcli/VOcadcli'; 

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

    getAppName(){
        return this.http.get(this.urlAppName)
        .map(
            (res: Response)=>{
                return res.json();
            }
        )
    }

 private urlXml = "http://186.202.61.22:8135/datasnap/rest/service/leituragenerica_xml/1/select "
    +"CRAZSOC,CID,cperiodo_dtfin,cperiodo_dtini , case when cserv_analise_balanco='S' then 'Analise de Balanco'"
    +" else '' end as analisebabalanco , case when cserv_auditar_estoque='S' then 'Auditar estoque' else ''"
    +"end as auditarestoque , case when cserv_comparativo_fiscalxcontabil='S' then 'Comparativo Fiscal x Contabil' "
    +"else '' end as comparativofiscalxcontabil FROM cadcli where ccnpj = '05.888.347%2F0040-11'4";

    teste(){
        let xml ='';
        this.http.get(this.urlXml)
        .map(
            (res : Response)=>res.text()
        ).subscribe(data =>{
            xml = data;
            console.log(xml);
        })
    }
}