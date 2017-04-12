export class Fields{
    // cliando toda class de TO do fields que esta no banco 
        public ccnpj:string;
        public cdenom :string;
        public cender_bairro : string;
        public cender_cep : string;
        public cender_cidade:string;
        public cender_codloc_ibge:string;
        public cender_complemento: string;
        public cender_log : string;
        public cender_num :string;
        public cender_uf : string;
        public cid:string;
        public cie : string;
        public cobs : string;
        public cpastadefault:string;
        public cperiodo_dtfin:string;
        public cperiodo_dtini:string;
        public cqtdnf_mensal:string;
        public  crazsoc:string;
        public  cserv_analise_balanco:string;
        public cserv_auditar_estoque : string;
        public cserv_comparativo_fiscalxcontabil:string;
        public cueve_computador : string;
        public cueve_cpf_usuario:string;
        public cueve_dathor:string;
        public numreg : string;
        public pdatabase : string;
        public qtdreg : string;    

    constructor(
         cdenom :string,
         cender_bairro : string,
         cender_cep : string,
         cender_cidade:string,
         cender_codloc_ibge:string,
         cender_complemento: string,
         cender_log : string,
         cender_num :string,
         cender_uf : string,
         cid:string,
         cie : string,
         cobs : string,
         cpastadefault:string,
         cperiodo_dtfin:string,
         cperiodo_dtini:string,
         cqtdnf_mensal:string,
          crazsoc:string,
          cserv_analise_balanco:string,
         cserv_auditar_estoque : string,
         cserv_comparativo_fiscalxcontabil:string,
         cueve_computador : string,
         cueve_cpf_usuario:string,
         cueve_dathor:string,
         numreg : string,
         pdatabase : string,
         qtdreg : string    
    ){
        this.cdenom = cdenom;
        this.cender_bairro = cender_bairro;
        this.cender_cep = cender_cep;
        this.cender_cidade = cender_cidade;
        this.cender_codloc_ibge = cender_codloc_ibge;
        this.cender_complemento = cender_complemento;
        this.cender_log = cender_log;
        this.cender_num = cender_num;
        this.cender_uf = cender_uf;
        this.cid = cid;
        this.cie= cie;
        this.cobs = cobs;
        this.cpastadefault = cpastadefault;
        this.cperiodo_dtfin = cperiodo_dtfin;
        this.cperiodo_dtini = cperiodo_dtini;
        this.cqtdnf_mensal = cqtdnf_mensal;
        this.crazsoc = crazsoc;
        this.cserv_analise_balanco = cserv_analise_balanco;
        this.cserv_auditar_estoque = cserv_auditar_estoque;
        this.cserv_comparativo_fiscalxcontabil = cserv_comparativo_fiscalxcontabil;
        this.cueve_computador = cueve_computador;
        this.cueve_cpf_usuario = cueve_cpf_usuario;
        this.cueve_dathor = cueve_dathor;
        this.numreg = numreg;
        this.pdatabase = pdatabase;
        this.qtdreg = qtdreg;
    }
}
