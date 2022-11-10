import { Employe } from "../employees/employe";

export class Observation {
    public id_observation !: number;
    public date !: string;
    public description !: string;
    public employe !: Employe;
}
