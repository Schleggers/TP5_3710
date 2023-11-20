import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Medecin } from 'src/app/intefaces/medecin';
import { CommunicationService } from 'src/app/services/communication.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})
export class MedecinComponent implements OnInit {
  medecins: Medecin[];
  displayedColumns: string[];
  constructor(private readonly communication: CommunicationService, private readonly dialog: MatDialog) {
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

  removeMedecin(medecin: Medecin): void {
    const id = medecin.idmedecin;
    this.communication.deleteMedecin(id).subscribe({
      next: () => {
        this.medecins = this.medecins.filter((medecin) => medecin.idmedecin !== id);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editMedecin(medecin: Medecin) {
    this.dialog.open(FormComponent, {data: medecin});
  }


}
