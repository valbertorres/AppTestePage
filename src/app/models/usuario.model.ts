export class UsuarioModel{
    public cuid_cliente : number;
    
    constructor(
        public cucpf : string,
        public cuemail : string,
        public cufone : string,
        public cuformapag : string,
         cuid_cliente : number,
        public cunome : string,
        public cuobs : string,
        public cusenha : string,
        public cuseq : string,
        public cuwatszapp : string,
        public pdatabase : string
    ){
         this.cuid_cliente = cuid_cliente ;
    }
}
