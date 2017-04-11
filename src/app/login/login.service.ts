import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Inject({})
export class LoginService{

    constructor(private http :Http){}

    
}