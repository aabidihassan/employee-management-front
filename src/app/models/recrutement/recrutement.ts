import { Employe } from "../employees/employe";
import { Fonction } from "../fonction/fonction";

export class Recrutement {
    public id_recrutement !: number;
    public date !: string;
    public demendeur !: Employe;
    public fonction !: Fonction;
    public contrat !: string;
    public statut !: boolean;
    public exigences !: Array<string>;
    public qualification !: string;
}
