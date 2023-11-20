import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medecin } from 'src/app/intefaces/medecin';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  medecin: Medecin;
  options: string[];
  constructor(@Inject (MAT_DIALOG_DATA) public data: Medecin, private readonly communicationService: CommunicationService) {
    this.medecin = { idmedecin: 0, nom: "", prenom: "", specialite: "", anneesexperience: 0, idservice: 0 };
  }

  ngOnInit(): void {
    if (this.data) {
      this.medecin.idmedecin = this.data.idmedecin;
      this.medecin.nom = this.data.nom;
      this.medecin.prenom = this.data.prenom;
      this.medecin.specialite = this.data.specialite;
      this.medecin.anneesexperience = this.data.anneesexperience;
    }
    this.options = ['Ophtalmologie', 'Dermatologie', 'Neurologie', 'Orthopédie', 'Psychiatrie','Cardiologie', 'Pédiatrie', 'Chirurgie', 'Gynécologie', 'Radiologie'];
  }

  submit() {
    console.log(this.medecin);
    if (this.data) {
      console.log("modify");
      this.communicationService.modifyMedecin(this.medecin);
    } else {
      console.log("add");
      this.communicationService.addMedecins(this.medecin);
    }
  }
}
