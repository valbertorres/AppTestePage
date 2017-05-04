import { 
  Component,
   OnInit,
   trigger,
   state,
   style,
   transition,
   animate
  } from '@angular/core';

@Component({
  selector: 'app-lembra-senha',
  templateUrl: './lembra-senha.component.html',
  styleUrls: ['./lembra-senha.component.css'],
  animations:[
      trigger('divState',[
        state('normal',style({
            'background-color':	'#d9534f',
            transform : 'translateX(0)'
        })),
        state('linha', style({
            'background-color':	'#428bca',
            transform : 'translateX(100px)'
        })),
        transition('normal <=>linha',animate(300))
      ]),
      trigger('wildState',[
        state('normal',style({
            'background-color':	'#d9534f',
            transform : 'translateX(0) scale(1)'
        })),
        state('linha', style({
            'background-color':	'#428bca',
            transform : 'translateX(100px) scale(1)'
        })),
        state('fechar', style({
            'background-color':	'	#5cb85c',
            transform : 'translateX(0px) scale(0.5)'
        })),
        transition('normal <=>linha',animate(300)),
        transition('fechar <=>*',[style({
          'background':'orange'
        }),
        animate(100,style({
          borderRadius:'50px'
        })),
        animate(500)
        ])
      ]),
        trigger('list1',[
        state('in',style({
            opacity:1,
            transform : 'translateX(0)'
        })),
        transition('void =>*',[
          style({
            opacity:0,
            transform : 'translateX(-100px)'
          }),
          animate(300)]),
        transition('* =>void',
          animate(300, style({
            transform : 'translateX(100px)',
            opacity:0
          }))),
      ]),
  ]
})
export class LembraSenhaComponent implements OnInit {

  state = "normal";
  wildState = "normal";
  private lista = ['item 1', 'item 2', 'item 3'];

  constructor() { }

  ngOnInit() {
  }

  onAnimatio(){
    this.state == 'normal' ? this.state ='linha': this.state='normal';
    this.wildState == 'normal' ? this.wildState = 'linha' : this.wildState='normal';
  }

  onShurink(){
    this.wildState='fechar';
  }

  onAdd(item){
    this.lista.push(item);
  }

  onDelete(item){
    this.lista.splice(this.lista.indexOf(item),1);
  }
}
