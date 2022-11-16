import { Gravite } from "../gravite/gravite";
import { SanctionToEmploye } from "../sanctionToEmploye/sanction-to-employe";

export class Sanction {
    public id_sanction !: number;
    public libelle !: string;
    public gravite !: Gravite;
    public employes !: Array<SanctionToEmploye>;
}
