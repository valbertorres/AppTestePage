import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { GrupoModel } from '../models/grupo.model';
import { ProdutoModel } from '../models/produto.model';

@Injectable()
export class CadService{
    produtoChange = new  Subject<ProdutoModel[]>();

      produtos : ProdutoModel[] = [];

 setProduto(produto : ProdutoModel[]){
     this.produtos = produto;
     this.produtoChange.next(this.produtos.slice());
 }

 getProduto(){
     return this.produtos.slice();
 }
 
 addProduto(produto : ProdutoModel){
     this.produtos.push(produto);
     this.produtoChange.next(this.produtos.slice());
 }

 getProdutoCod(cod : number){
    return this.produtos[cod];
 }
}