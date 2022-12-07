import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Questionnaire } from 'src/app/models/enquettes/questionnaire/questionnaire';
import { QuestionnaireService } from 'src/app/service/enquettes/questionnaire/questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  providers: [MessageService]
})
export class QuestionnaireComponent implements OnInit {

    enquettes: Questionnaire[] = [];

    constructor(private questionnaireService : QuestionnaireService, private router : Router) { }

    ngOnInit() {

        this.questionnaireService.getAll().subscribe(data=>{
            this.enquettes = data;
            this.enquettes.forEach((enq)=>{
                enq.nb_reponses = 0;
                enq.questions.forEach((ques)=>{
                    enq.nb_reponses+=ques.reponses.length;
                })
            })
        },err=>{
            this.router.navigate(['/']);
        })

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.router.navigate(['/enquettes/new']);
    }

    edit(questionnaire : Questionnaire){
        this.router.navigate(['/enquettes/new'], { state: { questionnaire : questionnaire } });
    }

}
