import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LembraSenhaComponent } from './lembra-senha/lembra-senha.component';

const appRouting : Routes = [
    { path : '' , redirectTo : '/login', pathMatch : 'full' },
    {path : 'login', component : LoginComponent},
    {path : 'cadastro', component : CadastroComponent},
    {path : 'lembrasenha', component : LembraSenhaComponent}
]

@NgModule({
    imports : [RouterModule.forRoot(appRouting)],
    exports : [RouterModule]

})
export class AppRoutingModule{}