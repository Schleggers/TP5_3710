import { Component, Input, OnInit } from '@angular/core';
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
  @Input() page: string;
  medecins: Medecin[];
  displayedColumns: string[];
  constructor(private readonly communication: CommunicationService, private readonly dialog: MatDialog) {
    this.medecins = [];
    this.displayedColumns = ['idmedecin', 'prenom', 'nom', 'specialite', 'anneesexperience', 'idservice', 'nomservice'];
  }
  
  ngOnInit(): void {
    if (this.page === 'delete') {
      this.displayedColumns.push('supprimer');
    } else if (this.page === 'modify') {
      this.displayedColumns.push('modifier');
    }
    this.getMedecin();
  }

  getMedecin(): void {
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
        this.getMedecin();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editMedecin(medecin: Medecin) {
    const dialogRef = this.dialog.open(FormComponent, {data: medecin, width: '30vw'});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getMedecin();
      }
    });
  }


}
