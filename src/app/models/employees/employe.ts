import { Famille } from "../famille/famille";
import { Fonction } from "../fonction/fonction";
import { Details } from "../rh/details/details";
import { Service } from "../services/service";
import { Statut } from "../statut/statut";
import { Utilisateur } from "../utilisateur/utilisateur";

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
    public famille !: Famille;
    public statut !: Statut;
    public detailsRH !: Details;
    public user !: Utilisateur;
    public fonction !: Fonction;
}
