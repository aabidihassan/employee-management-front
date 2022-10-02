import { AppRole } from "../role/app-role";

export class Utilisateur {
    public username !: String;
    public password !: String;
    public roles !: Array<AppRole>
}
