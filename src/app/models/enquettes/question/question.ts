import { Reponse } from "../reponse/reponse";

export class Question {
    public id_question !: number;
    public question !: string;
    public reponses !: Array<Reponse>;
}
