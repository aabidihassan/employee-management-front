import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Stage } from 'src/app/models/champs_cv/stage/stage';
import { Employe } from 'src/app/models/employees/employe';
import { StageService } from 'src/app/service/champs_cv/champs/stage/stage.service';
import { DocumentService } from 'src/app/service/documents/document.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

    employe:Employe = JSON.parse(localStorage.getItem('employe')!);
    stages: Stage[] = [];
    stage : Stage = new Stage();
    submitted: boolean = false;
    productDialog: boolean = false;

  constructor(private stageService : StageService, private documentService: DocumentService) { }

  ngOnInit(): void {

    this.stageService.getAllById(this.employe.id_employe).subscribe(data=>{
        this.stages = data;
        this.stages.forEach((e)=>{
            this.documentService.download(e.document.fichier).subscribe(data=>{
                e.document.file = new Blob([data.body!],
                    { type: `${data.headers.get('Content-Type')};charset=utf-8`}),
                    data.headers.get('File-Name')
            },err=>{
                console.log("Errooooooooor");
            })
        })
    },err=>{
        alert("Error")
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

open(file : Blob){
    var fileURL = window.URL.createObjectURL(file);
    let tab = window.open()!;
    tab.location.href = fileURL;
  }

openNew(){
    this.stage = new Stage();
    this.submitted = false;
    this.productDialog = true;
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

save(){
    this.submitted = true;
    this.stage.employe = this.employe;
    this.stageService.save(this.stage).subscribe(data=>{
        this.productDialog = false;
        this.stage = new Stage();
        this.ngOnInit();
    },err=>{
        alert("Error, try again")
    })
}

}
