import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { Result } from '../models/result.models';

@Injectable()
export class ResultService{

    resultChange = new Subject<Result[]>();

    result : Result[] = [];
   
    // set do array do rsult
    setResult(result : Result[]){
        this.result = result;
        this.resultChange.next(this.result.slice());
    }

    // get do array do result
    gerResult(){
        return this.result.slice();
    }
    
    
    // adicionar novo result no array
    addResult(result : Result){
        this.result.push(result);   
        this.resultChange.next(this.result.slice());    
    }
    
}