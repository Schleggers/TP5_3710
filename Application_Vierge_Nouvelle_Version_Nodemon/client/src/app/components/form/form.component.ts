import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() idMedecin: number;
  @Input() lastName: string;
  @Input() firstName: string;
  @Input() idService: number;
  @Input() yearOfExperience: number;
  @Input() speciality: string;
  options: string[];
  constructor() { 
    this.lastName = '';
    this.firstName = '';
    this.speciality = '';
    this.options = ['Ophtalmologie', 'Dermatologie', 'Neurologie', 'Orthopédie', 'Psychiatrie','Cardiologie', 'Pédiatrie', 'Chirurgie', 'Gynécologie', 'Radiologie'];
  }

  ngOnInit(): void {
  }

}
