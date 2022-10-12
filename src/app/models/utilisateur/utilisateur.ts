import { Employe } from "../employees/employe";
import { AppRole } from "../role/app-role";

export class Utilisateur {
    public username !: String;
    public password !: String;
    public employe !: Employe;
    public roles !: Array<AppRole>
}
