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
      
      // validar formato cpf
      private patternNumeroCpf = /^[0-9_.+-]+\.[0-9-]+\.[0-9-.]+\-[0-9-.]+$/;
      onFormValidCpf(control :FormControl):{[key : string ]:boolean}{
        if(this.patternNumeroCpf.test(control.value)){
            return null;
        }
        return {'cpf':true};
      }

      // busca no banco se o ccnpj valido
      onGetCnpj(){
        try{
          this.ccnpj = this.loginForm.value.ccnpj;
          this.onValidarInputCnpj(this.ccnpj);
          this.onValidarBusca(this.ccnpjAux, this.ccnpj);
          this.ccnpj = this.ccnpj.replace("\\","/");
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
                        this.ccnpjAux = this.loginForm.value.ccnpj;
                        this.onGetAllCnpj();
                        this.isCnpj= true;
                        this.empresa = t.getElementsByTagName("CRAZSOC")[0].firstChild.textContent;
                        data_dtfin = t.getElementsByTagName("cperiodo_dtfin")[0].firstChild.textContent;
                        data_dtini = t.getElementsByTagName("cperiodo_dtini")[0].firstChild.textContent;
                        auditorioa = t.getElementsByTagName("auditarestoque")[0].firstChild.textContent;
                        this.servico = [];
                        this.servico.push(data_dtini+' á '+data_dtfin+' '+auditorioa);
                        this.cnpj = this.ccnpj;
                        document.getElementById('cucpf').focus();
                    }else{
                        this.onClearCnpj();
                    }
                }
              }
            )
           
          }catch(err){
              if(err.message === 'true' ){
                document.getElementById('cucpf').focus();
              }else{
                  this.onClearCnpj();
              }
          }
        }
      

      // busca todos cadastrdo
      onGetAllCnpj(){ 
        try{
          this.loginDataService.onGetAll()
          .subscribe(
            (fields : Fields[])=>{
              this.fields = fields.find(field => field.ccnpj === this.ccnpj);
                this.cid = this.fields.cid;
                console.log(this.cid);
            }
          ) 
        }catch(err){
            console.log('erro ao buscar allCnpj: ',err);
        }
      }

        onGetUsuario(){
          try{
          if(!this.isCnpj){ 
                this.cpf ="";
                document.getElementById('ccnpj').focus();
                console.log('entrou no if false cpf');
            }else {
                var id;
                this.cucpf = this.loginForm.value.cucpf;
                this.onValidarInputCpf(this.cucpf);
                this.loginDataService.onGerUsuario()
                .subscribe(
                  (fields : UsuarioModel[])=>{
                    this.usuarios = fields.find(field => field.cucpf === this.cucpf);
                  if(this.usuarios !== undefined){
                      id = this.usuarios.cuid_cliente;
                       console.log(id)
                      if(id !== this.cid){
                        this.onValidarInputCpf(null);
                       }
                      this.isCpf = true;
                      this.usuario = this.usuarios.cunome;
                      console.log("Teste cunome ",this.usuarios.cunome);
                      document.getElementById("senha").focus();
                  }else{
                      this.onClearCpf();
                  }
                } 
                )
              }
        }catch(err){
          console.log(err.message);
               this.onClearCpf();

        }
      }

      onClearCpf(){
        this.isCpf = false;
          this.cpf ="";
          this.usuario = '';
          this.cusenha = '';
      }

      onClearCnpj(){
        this.isCnpj= false;
        this.loginForm.reset();
        this.servico = [];
        this.ccnpjAux ='';
      }

        onLogar(){
          if(this.isCpf){
                if(this.usuarios.cusenha === this.loginForm.value.cusenha){
                    console.log("senha valida "+this.usuarios.cusenha);
                }else{
                  this.cusenha = '';
                  console.log('senha invalida');
                }
            }else{
              this.cusenha ='';
              document.getElementById('cucpf');
            }
      }

        // mascara cnpj
        private cnpj : string;
        mascaraCnpj(event : any){
        let text = event.target.value;
        this.cnpj = text.replace(/[A-Za-z]/g,"");      
        this.cnpj=this.cnpj.replace(/^(\d{2})(\d)/,"$1.$2");
        this.cnpj=this.cnpj.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
        this.cnpj=this.cnpj.replace(/\.(\d{3})(\d)/,".$1/$2");
        this.cnpj=this.cnpj.replace(/(\d{4})(\d)/,"$1-$2");
        this.cnpj = this.cnpj.substring(0,18)
        
      }
      
      private cpf : string;
      mascaraCpf(event : any){
        let text = event.target.value;
        this.cpf = text.replace(/[A-Za-z]/g,"");
        this.cpf = this.cpf.replace(/^(\d{3})(\d)/,"$1.$2"); 
        this.cpf = this.cpf.replace(/^(\d{3})\.(\d{3})(\d)/,"$1.$2.$3");
        this.cpf = this.cpf.replace(/(\d{3})(\d)/,"$1-$2");
        this.cpf = this.cpf.substring(0,14);
       
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
            'has-danger':!isValid && isDirty,
            'has-success':isValid && isDirty,
            'col-xs-12 col-md-6':true
          }
      }

   
      onFomrControl(isValid :boolean , isDirty : boolean):{}{
          return{
            'form-control ':true,
            'form-control-danger':!isValid && isDirty ,
            'form-control-success': isValid && isDirty,
          }
      }

     

      onValidarInputCnpj(cnpj :string ){
          if( cnpj == undefined || cnpj ==='') throw new Error('cnpj empity');
          if(cnpj.length !=18) throw new Error('cnpj invalido');
        }
        
      onValidarInputCpf(cpf :string ){
          if( cpf == undefined || cpf ==='') throw new Error('cpf empity');
          if(cpf.length !=14) throw new Error('cpf invalido');
        }

        onValidarBusca(verificador:string, verificador2:string){
          if(verificador === verificador2)throw new Error('true');
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

    }