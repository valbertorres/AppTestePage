import { 
  Component, 
  OnInit,
  Output, 
  Input,
  OnChanges, 
  SimpleChange, 
  SimpleChanges, 
  EventEmitter 
} from '@angular/core';

import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CadastroService } from './cadastro.service';
import { ProdutoService } from './produto.service';

import { ProdutoModel } from '../models/produto.model';
import { GrupoModel } from '../models/grupo.model';

import { Response } from '@angular/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit, OnChanges {
   
 
private subscription: Subscription;
appName = this.cadastroService.getAppName();

cadastroFrom : FormGroup;

@Input() elemento : string;
@Output() elementChange : EventEmitter<string> = new EventEmitter();


    ngOnChanges(changes: SimpleChanges): void {

    }

      constructor(
        private cadastroService : CadastroService,
        private cadService : ProdutoService,  
        private router : Router
      ) { }

        ngOnInit() {
          this.initForm();
          this.p = new ProdutoModel(0,'','',null);
          this.gru = new GrupoModel(0,'');
          this.getAll();
        }
    grupo : GrupoModel[];
    gru : GrupoModel;
    produto : ProdutoModel[];
    
      getAll(){
        this.cadastroService.getAll();
        this.produto = this.cadService.getProduto();
        this.subscription = this.cadService.produtoChange
        .subscribe(
          (produtos : ProdutoModel[])=>{
            this.produto = produtos;
          }
        );
      }
       p :ProdutoModel;
      proCod : ProdutoModel[];
      getCodProduto(){
        this.cadastroService.getAll();
        this.proCod = this.cadService.getProduto();
        this.subscription = this.cadService.produtoChange
        .subscribe(
          (produtos : ProdutoModel[])=>{
            this.p = produtos.find(produto => produto.codProduto === this.cadastroFrom.value.codProduto);
            this.gru = this.p.grupoForm;
          }
          )
      }

    onSave(){
        this.cadService.addProduto(this.cadastroFrom.value);
        this.cadastroService.onSave()
        .subscribe(
          (res : Response)=>{
            console.log(res);
          }
        )
      }

      log(){
        console.log(this.cadastroFrom.value);
        
      }

      onLogin(){
        this.router.navigate(['login']);
      }

  initForm(){
    let codGrupo ='';
    let nomeGrupo ='';
    let codProduto ='';
    let nomeProduto = '';
    let marca = '';
    this.cadastroFrom = new FormGroup({
        'codProduto' : new FormControl(codProduto),
        'nomeProduto' : new FormControl(nomeProduto),
        'marca' : new FormControl(marca),
      grupoForm: new FormGroup({
        'codGrupo' : new FormControl(codGrupo),
        'nomeGrupo' : new FormControl(nomeGrupo),
      })
    });
  }
}
