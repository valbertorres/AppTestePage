import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const appRouting : Routes = [
    { path : '' , redirectTo : '/login', pathMatch : 'full' },
    {path : 'login', component : LoginComponent},
    {path : 'cadastro', component : CadastroComponent}
]

@NgModule({
    imports : [RouterModule.forRoot(appRouting)],
    exports : [RouterModule]

})
export class AppRoutingModule{}