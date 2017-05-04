import { 
  Component, 
  OnInit
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { CadastroService } from './cadastro.service';

import { ValidarCpfCnpj } from '../valids/validar-cpf-cnpj.service';

// class
   import { DadosCnpj } from '../models/dados-cnpj.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit{

    private cep : string ;
    private logradoura : string;
    private complementos:string;
    private bairro : string;
    private cidade :string;
    private uf : string;
    private unidade : string;
    private codCidade : string;

    private cnpj: string;

    private nome : string;
    private numero: string;
    private telefone : string;
    private fatasia : string;
    private email : string;

    private dadosCnpj : DadosCnpj;
    private dadosCnpjTas : DadosCnpj[]=[]

    constructor(
      private cadastroService : CadastroService,
      private validarCpfCnpj : ValidarCpfCnpj
      ){}

    ngOnInit() {
      this.dadosCnpj = new DadosCnpj('','','','','','','','','','','');
    }

    private auditoraCheck = [
      'Aúditoria de Estoque',
      'Análise de Balanlo',
      'Comparativo Fiscal x Contábil',
      'Todos'
    ];

    log(){
      try {
         this.onThrowCep(this.cep);
            this.cadastroService.getCep(this.cep)
        .subscribe(
          (dados :string)=>{
            let text = new DOMParser().parseFromString(dados,"text/xml");
            let cep  = text.getElementsByTagName("xmlcep")[0].childElementCount;
          
            if(cep === 1){
                this.onclearCep();
                return;
            }
            
           if(text.getElementsByTagName("logradouro")[0].firstChild.textContent != undefined){
             this.logradoura =  text.getElementsByTagName("logradouro")[0].firstChild.textContent;
           }
            
             if(text.getElementsByTagName("complemento")[0].firstChild != undefined){
                  this.complementos  = text.getElementsByTagName("complemento")[0].firstChild.textContent ;
            }

             if(text.getElementsByTagName("bairro")[0].firstChild != undefined){
                  this.bairro  = text.getElementsByTagName("bairro")[0].firstChild.textContent ;
            }

             if(text.getElementsByTagName("localidade")[0].firstChild != undefined){
                  this.cidade  = text.getElementsByTagName("localidade")[0].firstChild.textContent ;
            }

             if(text.getElementsByTagName("uf")[0].firstChild != undefined){
                  this.uf  = text.getElementsByTagName("uf")[0].firstChild.textContent ;
            }

             if(text.getElementsByTagName("unidade")[0].firstChild != undefined){
                  this.unidade  = text.getElementsByTagName("unidade")[0].firstChild.textContent ;
            }

             if(text.getElementsByTagName("ibge")[0].firstChild != undefined){
                  this.codCidade  = text.getElementsByTagName("ibge")[0].firstChild.textContent ;
            }
          }
        ); 
      }catch(err){
        this.onclearCep();
      }
    }

    onMascaraCnpj(event : any){
        let text = event.target.value;
        this.cnpj = text.replace(/[A-Za-z]/g,"");      
        this.cnpj=this.cnpj.replace(/^(\d{2})(\d)/,"$1.$2");
        this.cnpj=this.cnpj.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
        this.cnpj=this.cnpj.replace(/\.(\d{3})(\d)/,".$1/$2");
        this.cnpj=this.cnpj.replace(/(\d{4})(\d)/,"$1-$2");
        this.cnpj = this.cnpj.substring(0,18)
      }

      onValidarCnpj(){
        try {
          this.onThrowCpnj(this.cnpj);
        } catch (error) {
          console.log(error.message);
        }
      }

    onMascaraCep(event : any){
        let cepMask = event.target.value;
        this.cep = cepMask.replace(/[A-Za-z]/g,"");
        this.cep = this.cep.replace(/^(\d{5})(\d)/,"$1-$2");
        this.cep = this.cep.substring(0,9);
    }

    onclearCep(){
      this.cep='';
      this.logradoura='';
      this.complementos ='';
      this.codCidade='';
      this.cidade= '';
      this.bairro='';
      this.uf ='';
    }

    onThrowCep(cep : string){
      if(cep.length !=9) throw new Error('cep invalido');
    }

    onThrowCpnj(cnpj :string){
        if(!this.validarCpfCnpj.validarCnpj(cnpj)) throw new Error('CNPJ invalido');
    }

    onGetWebServiceCnpj(){
      this.cadastroService.getCnpjWebService()
      .subscribe(
        (data : DadosCnpj)=>{
            this.dadosCnpj = data;
            console.log(this.dadosCnpj.numero)
        }
      )

    }

}
