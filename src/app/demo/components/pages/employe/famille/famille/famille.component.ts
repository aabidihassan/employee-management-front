import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.scss']
})
export class FamilleComponent implements OnInit {

    situation = [
        { name: 'Célibataire', code: 'Option 1' },
        { name: 'Marié', code: 'Option 2' },
        { name: 'Divorcé', code: 'Option 2' }
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
