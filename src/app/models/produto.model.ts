
import { GrupoModel } from './grupo.model';
export class ProdutoModel{
    constructor(
        public codProduto : number,
        public nomeProduto : string,
        public marca : string,
        public grupoFrom: GrupoModel[]  
    ){}
}