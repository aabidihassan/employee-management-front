import { Service } from "../services/service";

export class Employe {
    public id_employe !: number;
    public nom !: string;
    public prenom !: string;
    public email !: string;
    public telephone !: string;
    public sex !: string;
    public naissance !: string;
    public matricule !: string;
    public adresse !: string;
    public cin !: string;
    public photo !: string;
    public service !: Service;
}
