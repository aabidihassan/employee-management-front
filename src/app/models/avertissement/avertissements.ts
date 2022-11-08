import { Employe } from "../employees/employe";

export class Avertissements {
    public id_avertissement !: number;
    public date !: string;
    public cause !: string;
    public employe !: Employe;
}
