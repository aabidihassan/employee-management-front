import { Employe } from "../../employees/employe";

export class Champ {

    public id_champs !: number;
    public date_debut !: string;
    public date_fin !: string;
    public description !: string;
    public attestation !: string;
    public employe !: Employe;

}
