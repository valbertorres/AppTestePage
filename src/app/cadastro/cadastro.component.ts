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

    private codGrupo ='';
    private nomeGrupo ='';
    private codProduto ='';
    private nomeProduto = '';
    private marca = '';
        grupo : GrupoModel[];
        gru : GrupoModel;
    produto :ProdutoModel;
    produtos : ProdutoModel[];

    ngOnChanges(changes: SimpleChanges): void {

    }

      constructor(
        private cadastroService : CadastroService,
        private cadService : ProdutoService,  
        private router : Router
      ) { }

        ngOnInit() {
          this.initForm();
          this.gru = new GrupoModel('','');
          this.produto = new ProdutoModel('','','',null);
          this.getAll();
        }
     
      teste(){
            this.cadastroService.teste();
            console.log("clickou");
      }

      getAll(){
        this.cadastroService.getAll();
        this.produtos = this.cadService.getProduto();
        this.subscription = this.cadService.produtoChange
        .subscribe(
          (produtos : ProdutoModel[])=>{
            this.produtos = produtos;
          }
        );
      }
      getCodProduto(){
        this.cadastroService.getAll();
        this.produtos = this.cadService.getProduto();
        this.subscription = this.cadService.produtoChange
        .subscribe(
          (produtos : ProdutoModel[])=>{
            this.produto = produtos.find(produto => produto.codProduto === this.cadastroFrom.value.codProduto);
             this.gru = this.produto.grupoForm;
             console.log(this.gru);
             this.inserDadosForm();
          }
          )
      }

      inserDadosForm(){
           this.codProduto =  this.produto.codProduto;
           this.nomeProduto = this.produto.nomeProduto;
           this.marca = this.produto.marca;
           this.codGrupo = this.gru.codGrupo;
           this.nomeGrupo = this.gru.nomeGrupo;
           this.initForm();
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
    
    this.cadastroFrom = new FormGroup({
        'codProduto' : new FormControl(this.codProduto),
        'nomeProduto' : new FormControl(this.nomeProduto),
        'marca' : new FormControl(this.marca),
      grupoForm: new FormGroup({
        'codGrupo' : new FormControl(this.codGrupo),
        'nomeGrupo' : new FormControl(this.nomeGrupo),
      })
    });
  }
}
