import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { Fields } from '../models/fields.model';

@Injectable()
export class FieldsService{

    fields : Fields[]=[];
    fielsChange = new Subject<Fields[]>();

    // get do array do field
    getFiels(){
        return this.fields.slice();
    }
    
    // set de array do field
    setFields(fields : Fields){
        this.fields.push(fields);
        this.fielsChange.next(this.fields.slice());
    }
}