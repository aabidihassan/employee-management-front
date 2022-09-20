import { Employe } from "../employees/employe";
import { Fonction } from "../fonction/fonction";

export class Service {

    public id_service !: number;
    public nom_service !: string;
    public fonctions !: Array<Fonction>;

}
