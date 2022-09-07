import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

    sex = [
        { name: 'Masculin', code: 'Option 1' },
        { name: 'Féminin', code: 'Option 2' }
    ];

    statut = [
        { name: 'Actif', code: 'Option 1' },
        { name: 'Ancien', code: 'Option 2' },
        { name: 'Retraité', code: 'Option 2' }
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
