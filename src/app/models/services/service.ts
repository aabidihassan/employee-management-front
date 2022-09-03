import { Employe } from "../employees/employe";

export class Service {

    public id_service !: number;
    public nom_service !: string;
    public employes !: Array<Employe>;

}
