import { Annee } from "../../annee/annee";
import { Employe } from "../../employees/employe";
import { Demande } from "../demande/demande";

export class Conge {

    public employe !: Employe;
    public nb_jours !: number;
    public demandes !: Array<Demande>;
    public annee !: Annee;

}
