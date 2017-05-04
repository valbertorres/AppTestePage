export class DadosCnpj{
    public nome : string;
    public complemento : string ;
    public uf : string;
    public telefone : string ;
    public email : string;
    public bairro : string;
    public logradouro : string ;
    public cep : string ;
    public numero : string;
    public municipio: string ;
    public fantasia : string ;
     
     constructor(
         nome : string,
         complemento : string,
         uf : string ,
         telefone : string,
         email :string ,
         bairro : string ,
         logradouro : string,
         cep : string ,
         numero : string,
         municipio : string,
         fantasia : string
     ){
         this.nome = nome;
         this.complemento = complemento;
         this.uf = uf;
         this.telefone = telefone;
         this.email = email ;
         this.bairro = bairro;
         this.logradouro = logradouro;
         this.cep = cep;
         this.numero = numero;
         this.municipio = municipio;
         this.fantasia = fantasia;
     }

}