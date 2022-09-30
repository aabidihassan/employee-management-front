import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Document } from 'src/app/models/document/document';
import { Employe } from 'src/app/models/employees/employe';
import { saveAs } from 'file-saver';
import { DocumentService } from 'src/app/service/documents/document.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-fichiers',
  templateUrl: './fichiers.component.html',
  styleUrls: ['./fichiers.component.scss']
})
export class FichiersComponent implements OnInit {

    employe:Employe = JSON.parse(localStorage.getItem('employe')!);
    submitted: boolean = false;
    productDialog: boolean = false;
    document : Document = new Document();
    formData : FormData = new FormData();
    selectedFiles?: FileList;
  constructor(private documentService : DocumentService) { }

  ngOnInit(): void {
    if(this.employe.documents!=null){
        this.employe.documents.forEach(doc=>{
            this.documentService.download(doc.fichier).subscribe(data=>{
                doc.file = new Blob([data.body!],
                    { type: `${data.headers.get('Content-Type')};charset=utf-8`}),
                    data.headers.get('File-Name')
            },err=>{
                console.log("Errooooooooor");
            })
        })
    }
  }

  download(file:Blob, name: string){
        saveAs(file, name);
  }

  delete(id:Document){
    this.employe.documents.forEach((doc, index)=>{
        if(doc == id) delete this.employe.documents[index]
    })
    this.documentService.delete(id.id_document).subscribe(data=>{
        alert("Fichier bien supprime")
    },err=>{
        alert("Error")
    })
  }

  open(file : Blob){
    var fileURL = window.URL.createObjectURL(file);
    let tab = window.open()!;
    tab.location.href = fileURL;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

openNew(){
    this.document = new Document();
    this.submitted = false;
    this.productDialog = true;
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

selectFile(event: any): void {
    this.selectedFiles = event.target.files;
}

save(){
    this.submitted = true;
    const file: File | null = this.selectedFiles?.item(0)!;
    this.formData.append('file', file);
    this.formData.append('description', this.document.description);
    this.documentService.save(this.formData, this.employe.id_employe).subscribe(data=>{
        this.productDialog = false;
        this.document = new Document();
        this.formData = new FormData();
        this.documentService.download(data.fichier).subscribe(dt=>{
            data.file = new Blob([dt.body!],
                { type: `${dt.headers.get('Content-Type')};charset=utf-8`}),
                dt.headers.get('File-Name')
                this.employe.documents.push(data)

        },err=>{
            console.log("Fichier n'a pas trouve");
        })
    },err=>{
        alert("Fichier deja existe");
    })
}

}
