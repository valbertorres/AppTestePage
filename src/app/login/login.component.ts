import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder ,FormGroupName, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router';

// import de services
import { DataStorageService } from '../result/data.storage.service';
import { FieldsService } from '../result/fields.service';
import { LoginDataService } from './login.data.service';
import { ResultService } from '../result/result.service';

// import de class
import { Fields } from '../models/fields.model';
import { Result } from '../models/result.models';

// import de valids
import { ValidarCpfCnpj } from '../valids/validar-cpf-cnpj.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private ccnpj : string="";
    private empresa : string;
    private cucpf : string;
    private servico:string;
    private cusenha: string;
    private usuario : string; 

    private fieldsList : Fields[];
    private fields : Fields;
    private resulList : Result[];
    private result : Result;
    private subscription : Subscription;

      // inicia combox com 
      private servicos;

      constructor(
        private dataStorage : DataStorageService,
        private fieldsService : FieldsService,
        private loginDataService : LoginDataService,
        private resultService : ResultService,
        private router : Router,
        private valids : ValidarCpfCnpj
      ) { }

      loginForm : FormGroup;

      // inicia um objeto da class fields
      onIniciaObjetos(){
        this.fields = new Fields('','','','','','','','','','','','','','','','','','','','','','','','','','');
      }

      // metodo que inicia com o DOM  
      ngOnInit() {
        document.getElementById('ccnpj').focus();
        this.initForm();
        this.getAll();
        this.onIniciaObjetos();
      }

      getAll(){
        // 05.888.347/0040-11
        this.dataStorage.getAll()
        this.fieldsList = this.fieldsService.getFiels();
        this.subscription = this.fieldsService.fielsChange
        .subscribe(
          (fieldes : Fields[])=>{
            this.fieldsList = fieldes;
          }
        );
      }
      getAllCnpj(){
        // 05.888.347/0040-11
        this.dataStorage.getAll();
        this.fieldsList = this.fieldsService.getFiels();
        this.subscription = this.fieldsService.fielsChange
        .subscribe(
          (fieldes : Fields[])=>{
            this.fields = fieldes.find(field => field.ccnpj === this.loginForm.value.ccnpj);
            this.iniciarNomeEmpresa();
          }
        )
      }
      // preenche o nome da empresa
      iniciarNomeEmpresa(){
        this.ccnpj = this.fields.ccnpj;
        this.empresa = this.fields.crazsoc;
        this.initForm();
      }

      // busca no banco o ccnpj valido
      onGetCpj(){
        let cnpj = this.loginForm.value.ccnpj;
        let c = cnpj.substring(0,2);
        let n = cnpj.substring(2,5);
        let p = cnpj.substring(5,8);
        let j = cnpj.substring(8,12);
        let digito = cnpj.substring(12,14);
        this.ccnpj = c+'.'+n+'.'+p+'%2F'+j+'-'+digito;


      }

      // metodo de salva
      onSubmit(){
        this.dataStorage.setStorage();
      }

      // indo para tela de esqueci senha
      onCadastro(){
        this.router.navigate(['/cadastro']);
      }

      // preenchendo formulario para tela de login
      initForm(){
          this.loginForm = new FormGroup({
              'ccnpj': new FormControl(this.ccnpj , [Validators.required]),
              'empresa' : new FormControl({value :this.empresa, disabled : true}),
              'servico' : new FormControl(this.servico , Validators.required),
              'cucpf' : new FormControl(this.cucpf, Validators.required),
              'cusenha' : new FormControl(this.cusenha, [Validators.required]),
              'usuario' : new FormControl({value : this.usuario, disabled : true})
          });
      }

      isCnpjValid():boolean{
        if(this.valids.validarCnpj(this.loginForm.value.ccnpj)){
          return true;
        }return false;
      }

}