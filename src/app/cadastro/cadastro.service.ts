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

    onSave(){
        const headers = new  Headers({
            'Content-Type':'application/json'
        });
<<<<<<< HEAD
       console.log(this.produtoService.getProduto());
       return this.http.put(this.url, this.produtoService.getProduto(), {headers: headers});
=======
       console.log(this.cadService.getProduto());
       return this.http.put(this.url, this.cadService.getProduto(), {headers: headers});
>>>>>>> ac3541b8458f16a144019f0c900b4e66bf152ecc
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
}