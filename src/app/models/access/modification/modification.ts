import { Utilisateur } from "../../utilisateur/utilisateur";

export class Modification {
    id_modification !: number;
    date_modification !: string;
    user !: Utilisateur;
}
