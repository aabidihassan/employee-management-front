import { Employe } from "../employees/employe";

export class Famille {
    public id_famille !: number;
    public nb_enfants !: number;
    public nb_enfants_adult !: number;
    public employe !: Employe;
    public situation !: string;
}
