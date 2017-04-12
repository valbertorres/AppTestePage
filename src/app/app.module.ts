import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Routings
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

// services
import { CadastroService } from './cadastro/cadastro.service';
import { FieldsService } from './result/fields.service';
import { ProdutoService } from './cadastro/produto.service';
import { ResultService } from './result/result.service';
import { DataStorageService } from './result/data.storage.service';

// diretivas
import { MascaraDirective } from './directive/mascara.directive';

// import de valids
import { ValidarCpfCnpj } from './valids/validar-cpf-cnpj.service';


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    MascaraDirective,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [FieldsService,CadastroService,DataStorageService,ProdutoService,ResultService,ValidarCpfCnpj],
  bootstrap: [AppComponent]
})
export class AppModule { }
