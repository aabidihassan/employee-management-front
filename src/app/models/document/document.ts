import { Employe } from "../employees/employe";

export class Document {
    public id_document !: number;
    public fichier !: string;
    public description !: string;
    public employe !: Employe;
    public file !: Blob;
}
