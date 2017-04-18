import { UsuarioModel } from './usuario.model';

export class UsuarioResult{
     public type: string;
      public id : number;
      public fields : UsuarioModel; 

        constructor(
                type: string,
                id : number
                ,fields : UsuarioModel
            ){
                this.type = type;
                this.id = id;
                this.fields = fields;
            }
}