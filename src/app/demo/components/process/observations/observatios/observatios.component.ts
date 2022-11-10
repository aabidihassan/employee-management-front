import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AvertissementDto } from 'src/app/dto/avertissement/avertissement-dto';
import { Employe } from 'src/app/models/employees/employe';
import { Observation } from 'src/app/models/observations/observation';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';
import { ObservationService } from 'src/app/service/observations/observation.service';

@Component({
  selector: 'app-observatios',
  templateUrl: './observatios.component.html',
  styleUrls: ['./observatios.component.scss'],
  providers: [MessageService, DatePipe]
})
export class ObservatiosComponent implements OnInit {

    observations: Observation[] = [];
    employes : Employe[] = [];
    avertissementDto : AvertissementDto = new AvertissementDto();
    submitted: boolean = false;
    productDialog: boolean = false;
    observation : Observation = new Observation();
    today !: string;
    deleteProductDialog: boolean = false;
    observationToDelete !: Observation;

    constructor(private observationService : ObservationService, private datePipe: DatePipe, private employeService : EmployesServiceService, private router : Router) { }

    ngOnInit() {

        this.employeService.getAll().subscribe(data=>{
            this.employes = data;
        },err=>{
            this.router.navigate(['/']);
        })

        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
        this.avertissementDto.de = this.datePipe.transform(new Date().setMonth(new Date().getMonth() - 1), 'yyyy-MM-dd')!;
        this.avertissementDto.jusqua = this.today;
        this.observation.date = this.today;

        this.observationService.search(this.avertissementDto).subscribe(data=>{
            this.observations = data;
        },err=>{
            this.router.navigate(['/']);
        })
    }

    changeSearch(){
        this.observation.employe = this.avertissementDto.employe;
        this.observationService.search(this.avertissementDto).subscribe(data=>{
            this.observations = data;
        },err=>{
            alert("Error")
        })
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.submitted = false;
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
        this.deleteProductDialog = false;
        this.observation = new Observation();
        this.observation.date = this.today;
        this.observation.employe = this.avertissementDto.employe;
    }

    save(){
        this.observationService.save(this.observation).subscribe(data=>{
            this.observations.push(data);
            this.hideDialog();
        },err=>{
            this.router.navigate(['/'])
        })
    }

    delete(observation : Observation){
        this.observationToDelete = observation;
        this.deleteProductDialog = true;
    }

    confirmDelete() {
        this.observationService.delete(this.observationToDelete.id_observation).subscribe(data=>{
            this.deleteProductDialog = false;
            this.observations = this.observations.filter(av=>av!=this.observationToDelete);
        },err=>{
            alert("Error, try again")
        })
    }

}
