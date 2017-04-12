
import { GrupoModel } from './grupo.model';
export class ProdutoModel{
<<<<<<< HEAD
    public grupoForm: GrupoModel
=======
    public grupoForm : GrupoModel[];
>>>>>>> ac3541b8458f16a144019f0c900b4e66bf152ecc
    constructor(
        public codProduto : string,
        public nomeProduto : string,
        public marca : string,
<<<<<<< HEAD
        grupoForm: GrupoModel
    ){
        this.grupoForm = grupoForm;
=======
         grupoModel: GrupoModel[] 
    ){
        this.grupoForm = grupoModel
>>>>>>> ac3541b8458f16a144019f0c900b4e66bf152ecc
    }
}