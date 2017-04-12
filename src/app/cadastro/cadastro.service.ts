import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { CadService } from './cadas.service';
import { ProdutoModel } from '../models/produto.model';

@Injectable()
export class CadastroService{

    private url = "https://intersys-c915f.firebaseio.com/produto.json";
    private urlAppName = 'https://intersys-c915f.firebaseio.com/appName.json';
    //private urlSys ='http://186.202.61.22:8135/AUDSPED/AUDITORIA/TpVOcadcli/VOcadcli'; 

    constructor(
        private http: Http,
        private cadService : CadService
    ){}

    onSave(){
        const headers = new  Headers({
            'Content-Type':'application/json'
        });
       console.log(this.cadService.getProduto());
       return this.http.put(this.url, this.cadService.getProduto(), {headers: headers});
    }

    getAll(){
        return this.http.get(this.url)
       /* .map(
            (res : Response)=>{
            const produtos : ProdutoModel[] = res.json();
            for(let produto of produtos){
                if(!produto['grupoForm']){
                    produto['grupoForm']=[]
                    console.log(produto);
                }
            }
            return produtos
        })*/
        .subscribe(
            (res : Response)=>{
                const produtos : ProdutoModel[] = res.json();
                this.cadService.setProduto(produtos);
                console.log(produtos);
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
}