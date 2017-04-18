import { Component, OnInit, Input , AfterViewInit} from '@angular/core';
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
import { UsuarioModel } from '../models/usuario.model';

// import de valids
import { ValidarCpfCnpj } from '../valids/validar-cpf-cnpj.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    private ccnpj : string="";
    private empresa : string;
    private cucpf : string;
    private servico:string[]=[];
    private cusenha: string;
    private usuario : string; 

    private fieldsList : Fields[];
    private fields : Fields;
    private usuariosModel : UsuarioModel[]=[];
    private usuarios : UsuarioModel;
    private resulList : Result[];
    private result : Result;
    private subscription : Subscription;
    private text :string;
    private isCnpj:boolean;
    private cnpjInvalido:string;
    private showCnnpj:boolean;
    private cid : number;

      // inicia combox com 
      private servicos;

      constructor(
        private dataStorage : DataStorageService,
        private fieldsService : FieldsService,
        private loginDataService : LoginDataService,
        private resultService : ResultService,
        private router : Router,
        private validsCpf : ValidarCpfCnpj
      ) { }

      loginForm : FormGroup;

      // inicia um objeto da class fields
      onIniciaObjetos(){
        this.fields = new Fields('','','','','','','','','',0,'','','','','','','','','','','','','','','','');
        this.usuarios = new UsuarioModel('','','','',0,'','','','','','');
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


      // busca no banco se o ccnpj valido
      onGetCpj(){
        if(!this.validsCpf.validarCnpj(this.loginForm.value.ccnpj)){
          this.isCnpj= false;
          this.showCnnpj=true;
          this.cnpjInvalido = "CNPJ informado é invalido !";
          this.loginForm.reset();
        }else{
          this.showCnnpj = false;
          this.isCnpj = true;
          let cnpj = this.loginForm.value.ccnpj;
          let c = cnpj.substring(0,2);
          let n = cnpj.substring(2,5);
          let p = cnpj.substring(5,8);
          let j = cnpj.substring(8,12);
          let digito = cnpj.substring(12,14);
          this.ccnpj = c+'.'+n+'.'+p+'%2F'+j+'-'+digito;

          let data_dtfin='';
          let data_dtini='';
          let auditorioa= '';
        this.loginDataService.onGet(this.ccnpj)
        .subscribe(
          (data : any[])=>{
                for(let d of data ){
                 this.text = d.fields.pDadosXML;
                   let t = new DOMParser().parseFromString(this.text, 'text/xml');
                   if(t.getElementsByTagName("DADOSTABELA")[0].firstChild != null){
                        this.empresa = t.getElementsByTagName("CRAZSOC")[0].firstChild.textContent;
                        data_dtfin = t.getElementsByTagName("cperiodo_dtfin")[0].firstChild.textContent;
                        data_dtini = t.getElementsByTagName("cperiodo_dtini")[0].firstChild.textContent;
                        auditorioa = t.getElementsByTagName("auditarestoque")[0].firstChild.textContent;
                        this.servico.push(data_dtini+' á '+data_dtfin+' '+auditorioa);
                   }else{
                       this.isCnpj= false;
                       this.showCnnpj=true;
                       this.cnpjInvalido = "CNPJ não está cadastrado!";
                   }
                }
              }
           )
        }
      }

      // busca todos cadastrdo
      onGetAllCnpj(){
         let cnpj = this.loginForm.value.ccnpj;
          let c = cnpj.substring(0,2);
          let n = cnpj.substring(2,5);
          let p = cnpj.substring(5,8);
          let j = cnpj.substring(8,12);
          let digito = cnpj.substring(12,14);
          this.ccnpj = c+'.'+n+'.'+p+'/'+j+'-'+digito;

          this.loginDataService.onGetAll()
          .subscribe(
            (fields : Fields[])=>{
              this.fields = fields.find(field => field.ccnpj === this.ccnpj);
               if(this.fields.cid  ===  this.onGetUsuario()){
                  console.log(this.fields.cid);
               }
            }
          ) 
      }

      onGetUsuario():number{
        var id;
        this.cucpf = this.loginForm.value.cucpf;
        let c = this.cucpf.substring(0,3);
        let p = this.cucpf.substring(3,6);
        let f = this.cucpf.substring(6,9);
        let digito = this.cucpf.substring(9,11);
        this.cucpf = c+"."+p+"."+f+"-"+digito;
       
        this.loginDataService.onGerUsuario()
        .subscribe(
          (fields : UsuarioModel[])=>{
             this.usuarios = fields.find(field => field.cucpf === this.cucpf);
              id = this.usuarios.cuid_cliente;
              console.log(id);
          }
        )
        return id;
      }

      // metodo de salva
      onSubmit(){
        this.dataStorage.setStorage();
      }

      // indo para tela de esqueci senha
      onCadastro(){
        this.router.navigate(['/cadastro']);
      }

      // montar as class style
      onFormGroup():{}{
          return {
            'form-group col-xs-12 col-md-6' : true,
            'has-danger' : !this.isCnpj && !this.loginForm.pristine,
            'has-success' : this.isCnpj && !this.loginForm.pristine
            }
      }

      // varifica os estado do input
      onFormControl():{}{
        return{
          'form-control':true,
          'form-control-danger':!this.isCnpj && !this.loginForm.pristine,
          'form-control-success' : this.isCnpj && !this.loginForm.pristine
        }
      }

      // preenchendo formulario para tela de login
      initForm(){
          this.loginForm = new FormGroup({
              'ccnpj': new FormControl(this.ccnpj , [Validators.required]),
              'empresa' : new FormControl({value :this.empresa, disabled : true}),
              'servico' : new FormControl(this.servico , Validators.required),
              'cucpf'   : new FormControl(this.cucpf, Validators.required),
              'cusenha' : new FormControl(this.cusenha, [Validators.required]),
              'usuario' : new FormControl({value : this.usuario, disabled : true})
          });
      }

}