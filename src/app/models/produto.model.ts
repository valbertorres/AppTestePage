
import { GrupoModel } from './grupo.model';
export class ProdutoModel{
    public grupoForm: GrupoModel
    constructor(
        public codProduto : number,
        public nomeProduto : string,
        public marca : string,
        grupoForm: GrupoModel
    ){
        this.grupoForm = grupoForm;
    }
}