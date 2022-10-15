import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Education } from 'src/app/models/champs_cv/education/education';
import { Employe } from 'src/app/models/employees/employe';
import { EducationService } from 'src/app/service/champs_cv/champs/education/education.service';
import { DocumentService } from 'src/app/service/documents/document.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

    employe:Employe = JSON.parse(localStorage.getItem('employe')!);
    educations: Education[] = [];
    education : Education = new Education();
    submitted: boolean = false;
    productDialog: boolean = false;
  constructor(private educationService : EducationService, private documentService : DocumentService) { }

  ngOnInit(): void {

    this.educationService.getAllById(this.employe.id_employe).subscribe(data=>{
        this.educations = data;
        this.educations.forEach((e)=>{
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
    this.education = new Education();
    this.submitted = false;
    this.productDialog = true;
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

save(){
    this.submitted = true;
    this.education.employe = this.employe;
    this.educationService.save(this.education).subscribe(data=>{
        this.productDialog = false;
        this.education = new Education();
        this.ngOnInit();
    },err=>{
        alert("Error, try again")
    })
}

}
