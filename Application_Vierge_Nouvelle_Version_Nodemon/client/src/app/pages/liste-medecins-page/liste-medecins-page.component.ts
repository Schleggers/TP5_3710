import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from 'src/app/components/form/form.component';
import { MedecinComponent } from 'src/app/components/medecin/medecin.component';

@Component({
  selector: 'app-liste-medecins-page',
  templateUrl: './liste-medecins-page.component.html',
  styleUrls: ['./liste-medecins-page.component.css']
})
export class ListeMedecinsPageComponent implements OnInit {
  @ViewChild("medecin") medecin : MedecinComponent;
  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medecin.ngOnInit();
      }
    });
  }

}
