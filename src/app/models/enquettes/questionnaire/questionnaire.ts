import { Question } from "../question/question";

export class Questionnaire {

    public id_enquette !: number;
    public nom !: string;
    public questions : Array<Question> = new Array<Question>;
    public nb_reponses !: number;

}
