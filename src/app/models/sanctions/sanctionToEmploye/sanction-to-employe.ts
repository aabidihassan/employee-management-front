import { Employe } from "../../employees/employe";
import { Sanction } from "../sanctions/sanction";

export class SanctionToEmploye {
    public id_affectation !: number;
    public sanction !: Sanction;
    public employe !: Employe;
    public date !: string;
}
