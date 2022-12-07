import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/enquettes/question/question';
import { Questionnaire } from 'src/app/models/enquettes/questionnaire/questionnaire';
import { QuestionService } from 'src/app/service/enquettes/question/question.service';
import { QuestionnaireService } from 'src/app/service/enquettes/questionnaire/questionnaire.service';

@Component({
  selector: 'app-addenquette',
  templateUrl: './addenquette.component.html',
  styleUrls: ['./addenquette.component.scss']
})
export class AddenquetteComponent implements OnInit {

    questions: Question[] = [];
    enquette !: Questionnaire;

  constructor(private questionService : QuestionService, private router : Router, private enquetteService : QuestionnaireService) { }

  ngOnInit(): void {
    this.enquette = history.state.questionnaire!=null ? history.state.questionnaire : new Questionnaire();
    this.questionService.getAll().subscribe(data=>{
        this.questions = data;
        console.log(this.enquette.questions);
        this.questions = this.questions.filter((ques)=>!this.contains(ques));
    })
  }

  private contains(question : Question):boolean{
    var response = false;
    this.enquette.questions.forEach((ques)=>{response = ques.id_question==question.id_question})
    return response;
  }

  save(){
    this.enquetteService.save(this.enquette).subscribe(data=>{
        this.router.navigate(['/enquettes']);
    },err=>{
        console.log(err);
    })
  }

}
