import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// Routings
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

// services
import { CadastroService } from './cadastro/cadastro.service';
import { FieldsService } from './result/fields.service';
import { LoginDataService } from './login/login.data.service';
import { UsuarioService } from './result/usuario.service';
import { ResultService } from './result/result.service';
import { DataStorageService } from './result/data.storage.service';

// diretivas
import { MascaraDirective } from './directive/mascara.directive';

// import de valids
import { ValidarCpfCnpj } from './valids/validar-cpf-cnpj.service';
import { LembraSenhaComponent } from './lembra-senha/lembra-senha.component';


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    MascaraDirective,
    LoginComponent,
    LembraSenhaComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    JsonpModule,
    BrowserAnimationsModule
  ],
  exports : [FormsModule],

  providers: [
    FieldsService,
    LoginDataService,
    CadastroService,
    DataStorageService,
    UsuarioService,
    ResultService,
    ValidarCpfCnpj],

  bootstrap: [AppComponent]
})
export class AppModule { }
