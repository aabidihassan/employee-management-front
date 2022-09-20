import { Employe } from "../employees/employe";
import { Service } from "../services/service";

export class Fonction {
    public id_fonction : number = 0;
    public poste !: string;
    public service !: Service;
    public employes !: Array<Employe>;
}
