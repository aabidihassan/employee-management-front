import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Professionnel } from 'src/app/models/champs_cv/professionnel/professionnel';
import { Employe } from 'src/app/models/employees/employe';
import { ProfessionnelService } from 'src/app/service/champs_cv/champs/professionnel/professionnel.service';
import { DocumentService } from 'src/app/service/documents/document.service';

@Component({
  selector: 'app-professionnel',
  templateUrl: './professionnel.component.html',
  styleUrls: ['./professionnel.component.scss']
})
export class ProfessionnelComponent implements OnInit {

    employe:Employe = JSON.parse(localStorage.getItem('employe')!);
    professionnels: Professionnel[] = [];
    professionnel : Professionnel = new Professionnel();
    submitted: boolean = false;
    productDialog: boolean = false;

  constructor(private professionnelService : ProfessionnelService, private documentService : DocumentService) { }

  ngOnInit(): void {

    this.professionnelService.getAllById(this.employe.id_employe).subscribe(data=>{
        this.professionnels = data;
        this.professionnels.forEach((e)=>{
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
    this.professionnel = new Professionnel();
    this.submitted = false;
    this.productDialog = true;
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

save(){
    this.submitted = true;
    this.professionnel.employe = this.employe;
    this.professionnelService.save(this.professionnel).subscribe(data=>{
        this.productDialog = false;
        this.professionnel = new Professionnel();
        this.ngOnInit();
    },err=>{
        alert("Error, try again")
    })
}

}
