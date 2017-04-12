import { Fields } from './fields.model';

export class Result{
      public type: string;
      public id : number;
      public fields : Fields; 

        constructor(
                type: string,
                id : number
                ,fields : Fields
            ){
                this.type = type;
                this.id = id;
                this.fields = fields;

            }
}