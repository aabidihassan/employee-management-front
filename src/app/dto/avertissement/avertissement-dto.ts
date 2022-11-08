import { Employe } from "src/app/models/employees/employe";

export class AvertissementDto {
    public de !: string;
    public jusqua !: string;
    public employe !: Employe;
}
