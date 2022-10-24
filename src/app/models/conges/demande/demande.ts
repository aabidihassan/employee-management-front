import { Employe } from "../../employees/employe";
import { Conge } from "../conge/conge";
import { Etat } from "../etat/etat";

export class Demande {
    public id_demande !: number;
    public date_debut !: string;
    public date_fin !: string;
    public etat !: Etat;
    public nb_jour !: number;
    public conge !: Conge;
    public adjoint !: Employe;
}
