import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class LoginDataService{

    private urlCnnpj = "http://186.202.61.22:8135/datasnap/rest/service/leituragenerica_xml/1/select CRAZSOC,CID,cperiodo_dtfin,cperiodo_dtini , case when cserv_analise_balanco='S' then 'Analise de Balanco' else '' end as analisebabalanco , case when cserv_auditar_estoque='S' then 'Auditar estoque' else '' end as auditarestoque , case when cserv_comparativo_fiscalxcontabil='S' then 'Comparativo Fiscal x Contabil' "
    +"else '' end as comparativofiscalxcontabil FROM cadcli where ccnpj = '05.888.347%2F0040-11'"

    constructor(
        private http : Http
    ){}

    onGet(cnpj :string){
        return this.http.get(this.urlCnnpj)
        .map(
            (res : Response)=>{
                const data = res.json().result[0]
                return data;
            }
        )
    }
}