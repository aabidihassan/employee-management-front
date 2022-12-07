import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Question } from 'src/app/models/enquettes/question/question';
import { QuestionService } from 'src/app/service/enquettes/question/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [MessageService]
})
export class QuestionComponent implements OnInit {

    questions: Question[] = [];
    submitted: boolean = false;
    productDialog: boolean = false;
    question : Question = new Question();

    constructor(private questionService : QuestionService, private router : Router) { }

    ngOnInit() {

        this.questionService.getAll().subscribe(data=>{
            this.questions = data;
        },err=>{
            this.router.navigate(['/']);
        })

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.submitted = false;
        this.productDialog = true;
    }

    edit(question : Question){
        this.question = question;
        this.submitted = false;
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
        this.question = new Question();
    }

    save(){
        this.questionService.save(this.question).subscribe(data=>{
            this.hideDialog();
            this.question = new Question();
            this.ngOnInit();
        },err=>{
            this.router.navigate(['/'])
        })
    }

}
