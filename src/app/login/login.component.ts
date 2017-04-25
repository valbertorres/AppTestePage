    import { Component, OnInit, Input , AfterViewInit} from '@angular/core';
    import { FormControl, FormBuilder ,FormGroupName, FormGroup, Validators } from '@angular/forms';
    import { Subscription } from 'rxjs/Subscription'
    import { Router } from '@angular/router';
    import { Observable } from 'rxjs/Observable';

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
    private cid : number;
    private cpfInvalido:string;

    private isCnpj:boolean;
    private isCpf:boolean;
    private isBusca : boolean;

    private ccnpjAux : string;

      // inicia combox com 
      private servicos;

      constructor(
        private dataStorage : DataStorageService,
        private fieldsService : FieldsService,
        private loginDataService : LoginDataService,
        private resultService : ResultService,
        private router : Router,
        private validsCpfCnpj : ValidarCpfCnpj
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

      // Valida campo com somente número
      private patternNumeroCNpj = /^[0-9_.+-]+\.[0-9-]+\.[0-9-.]+\/[0-9-.]+\-[0-9-.]+$/;
      onFormValid(control :FormControl):{[key : string ]:boolean}{
        if(this.patternNumeroCNpj.test(control.value)){
            return null;
        }
        return {'cnpj':true};
      }
      
      private patternNumeroCpf = /^[0-9_.+-]+\.[0-9-]+\.[0-9-.]+\-[0-9-.]+$/;
      onFormValidCpf(control :FormControl):{[key : string ]:boolean}{
        if(this.patternNumeroCpf.test(control.value)){
            return null;
        }
        return {'cpf':true};
      }

      // busca no banco se o ccnpj valido
      onGetCnpj(){
        if(this.loginForm.value.ccnpj === undefined){
          this.isCnpj= false;
          
        }else {
          this.ccnpj = this.loginForm.value.ccnpj;
          if(this.ccnpj != this.ccnpjAux && this.ccnpj.length==18){
          this.ccnpj = this.ccnpj.replace("\\","/");
          this.isBusca = true;
          this.ccnpjAux =  this.ccnpj;
          // let c = cnpj.substring(0,2);
          // let n = cnpj.substring(2,5);
          // let p = cnpj.substring(5,8);
          // let j = cnpj.substring(8,12);
          // let digito = cnpj.substring(12,14);
          // this.ccnpj = c+'.'+n+'.'+p+'%2F'+j+'-'+digito;
          let cnpj = this.ccnpj.replace('/',"%2F");
          

          let data_dtfin='';
          let data_dtini='';
          let auditorioa= '';
        this.loginDataService.onGet(cnpj)
        .subscribe(
          (data : any[])=>{
                for(let d of data ){
                  this.text = d.fields.pDadosXML;
                    let t = new DOMParser().parseFromString(this.text, 'text/xml');
                    if(t.getElementsByTagName("DADOSTABELA")[0].firstChild != null){
                        this.onGetAllCnpj();
                        this.isCnpj= true;
                        this.empresa = t.getElementsByTagName("CRAZSOC")[0].firstChild.textContent;
                        data_dtfin = t.getElementsByTagName("cperiodo_dtfin")[0].firstChild.textContent;
                        data_dtini = t.getElementsByTagName("cperiodo_dtini")[0].firstChild.textContent;
                        auditorioa = t.getElementsByTagName("auditarestoque")[0].firstChild.textContent;
                        this.servico.push(data_dtini+' á '+data_dtfin+' '+auditorioa);
                        document.getElementById('cucpf').focus();
                        this.cnpj = this.ccnpj;
                    }else{
                        this.isCnpj= false;
                        this.cnpj = "";
                        this.empresa ="";
                        this.servico =[];
                        this.cpf ="";
                        this.usuario = '';
                        this.cusenha = '';
                    }
                }
              }
            )
          }
        }if(this.ccnpj.length !=18 ){
          this.ccnpjAux = "";
            this.isCnpj= false;
            this.cnpj = "";
            this.empresa ="";
            this.servico =[];
            this.cpf ="";
            this.usuario = '';
            this.cusenha='';
        }
      }

      // busca todos cadastrdo
      onGetAllCnpj(){ 
        
          this.loginDataService.onGetAll()
          .subscribe(
            (fields : Fields[])=>{
              this.fields = fields.find(field => field.ccnpj === this.ccnpj);
                this.cid = this.fields.cid;
                console.log(this.cid);
            }
          ) 
          
      }

    private reset : boolean;
        onGetUsuario(){
          
          if(!this.isCnpj){ 
                this.cpf ="";
                document.getElementById('ccnpj').focus();
            }else {
                var id;
                this.cucpf = this.loginForm.value.cucpf;
                this.loginDataService.onGerUsuario()
                .subscribe(
                  (fields : UsuarioModel[])=>{
                    this.usuarios = fields.find(field => field.cucpf === this.cucpf);
                    if(this.usuarios != undefined){
                        id = this.usuarios.cuid_cliente;
                        console.log(id)
                        if(id === this.cid){
                          this.isCpf = true;
                            this.usuario = this.usuarios.cunome;document.getElementById("senha").focus();
                          }
                        }else{
                            this.cpf ="";
                            this.usuario = '';
                            this.cusenha = '';
                            this.cpfInvalido = "CPF não cadastrado!";
                        }
                    }
                )
              }
        }

        onLogar(){
          if(this.isCpf){
           
                if(this.usuarios.cusenha === this.loginForm.value.cusenha){
                    console.log(this.usuarios.cusenha);
                }else{
                  this.cusenha = '';
                }
            }
      }

        // mascara cnpj
        private cnpj : string;
          i =0;
        mascaraCnpj(event : any){
          // console.log(event.keyCode);
        this.cnpj = event.target.value;
        
        this.cnpj=this.cnpj.replace(/^(\d{2})(\d)/,"$1.$2");
        this.cnpj=this.cnpj.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
        this.cnpj=this.cnpj.replace(/\.(\d{3})(\d)/,".$1/$2");
        this.cnpj=this.cnpj.replace(/(\d{4})(\d)/,"$1-$2");
        
        setTimeout(()=>{
        // if(!(event.keyCode >= 96) && (event.keyCode <=105)){
        //     this.cnpj = "";
        // }
            this.cnpj = this.cnpj.trim();
        },1)
      }
      
      eNumero(string : string){
        string=string.replace(/\D/g,"")
        return string;
      }

      private cpf : string;
      mascaraCpf(event : any){
        this.cpf = event.target.value;
        this.cpf = this.cpf.replace(/^(\d{3})(\d)/,"$1.$2"); 
        this.cpf = this.cpf.replace(/^(\d{3})\.(\d{3})(\d)/,"$1.$2.$3");
        this.cpf = this.cpf.replace(/(\d{3})(\d)/,"$1-$2");

        setTimeout(()=>{
          this.cpf = this.cpf.trim();
        },1)
      }

      // metodo de salva
      onSubmit(){
        this.dataStorage.setStorage();
      }

      // indo para tela de esqueci senha
      onCadastro(){
        this.router.navigate(['/cadastro']);
      }

      onFomrGroup(isValid :boolean , isDirty : boolean):{}{
          return{
            'form-group':true,
            'has-danger': !this.isCnpj && isDirty || !isValid && isDirty,
            'has-success':isValid && isDirty,
            'col-xs-12 col-md-6':true
          }
      }

      onFomrControl(isValid :boolean , isDirty : boolean):{}{
          return{
            'form-control ':true,
            'form-control-danger':  !this.isCnpj && isDirty || !isValid && isDirty,
            'form-control-success': isValid && isDirty,
          }
      }


      // preenchendo formulario para tela de login
      initForm(){
          this.loginForm = new FormGroup({
              'ccnpj': new FormControl(this.ccnpj , [Validators.required,this.onFormValid.bind(this)]),
              'empresa' : new FormControl({value :this.empresa, disabled : true}),
              'servico' : new FormControl(this.servico , Validators.required),
              'cucpf'   : new FormControl(this.cucpf, [Validators.required, this.onFormValidCpf.bind(this)]),
              'cusenha' : new FormControl(this.cusenha, [Validators.required]),
              'usuario' : new FormControl({value : this.usuario, disabled : true})
          });
      }

      resetForm(){
        this.loginForm.setValue({
          'ccnpj':this.ccnpj,
          'empresa' : '',
          'servico' : '',
          'cucpf' : '',
          'usuario' : '',
          'cusenha' : ''
        })
      }

    }