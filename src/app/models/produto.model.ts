
import { GrupoModel } from './grupo.model';
export class ProdutoModel{
    public grupoForm : GrupoModel[];
    constructor(
        public codProduto : string,
        public nomeProduto : string,
        public marca : string,
         grupoModel: GrupoModel[] 
    ){
        this.grupoForm = grupoModel
    }
}