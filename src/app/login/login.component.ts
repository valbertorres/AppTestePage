import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

@Input() teste : string;
  constructor(
    private router : Router
  ) { }

  t = [];
  lista : string;
  lista2 : string;

  ngOnInit() {
  }

  onAdd(){
    this.t.push(this.lista);
  }

  onSubmit(form : NgForm){
    console.log(form.value);
  }

  onDelete(i : number){
    const position = i;
    console.log(position);
    this.t.slice(i);
  }

  onCadastro(){
    this.router.navigate(['/cadastro']);
  }

 
  
}
