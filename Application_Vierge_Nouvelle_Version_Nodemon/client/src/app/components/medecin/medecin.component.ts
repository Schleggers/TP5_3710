import { Component, OnInit } from '@angular/core';
import { Medecin } from 'src/app/intefaces/medecin';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})
export class MedecinComponent implements OnInit {
  medecins: Medecin[];
  displayedColumns: string[];
  constructor(private readonly communication: CommunicationService) {
    this.medecins = [];
    this.displayedColumns = ['idmedecin', 'prenom', 'nom', 'specialite', 'anneesexperience', 'nomservice', 'modifier' , 'supprimer'];
  }

  ngOnInit(): void {
    this.communication.getAllMedecins().subscribe({
      next: (medecins) => {
        this.medecins = medecins;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
