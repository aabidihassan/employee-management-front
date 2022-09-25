import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Stage } from 'src/app/models/champs_cv/stage/stage';
import { Employe } from 'src/app/models/employees/employe';
import { StageService } from 'src/app/service/champs_cv/champs/stage/stage.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

    employe:Employe = JSON.parse(localStorage.getItem('employe')!);
    customers1: Stage[] = [];
    stage : Stage = new Stage();
    submitted: boolean = false;
    productDialog: boolean = false;

  constructor(private stageService : StageService) { }

  ngOnInit(): void {

    this.stageService.getAllById(this.employe.id_employe).subscribe(data=>{
        this.customers1 = data;
    },err=>{
        alert("Error")
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
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
