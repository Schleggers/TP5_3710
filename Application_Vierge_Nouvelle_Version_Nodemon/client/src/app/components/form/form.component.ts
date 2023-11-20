import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Medecin } from 'src/app/intefaces/medecin';
import { Service } from 'src/app/intefaces/service';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  options: string[];
  registerForm: FormGroup;
  services : Service[];

  constructor(@Inject (MAT_DIALOG_DATA) public data: Medecin, 
  private readonly communicationService: CommunicationService,
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<FormComponent>) {}

  ngOnInit(): void {
    if (this.data) {
      this.registerForm = this.formBuilder.group({
        idMedecin: [this.data.idmedecin, Validators.required],
        firstName: [this.data.prenom, Validators.required],
        lastName: [this.data.nom, Validators.required],
        speciality: [this.data.specialite, Validators.required],
        yearOfExperience: [this.data.anneesexperience, Validators.required],
        idService: [this.data.idservice, Validators.required]
      });
    } else {
      this.registerForm = this.formBuilder.group({
        idMedecin: [0, Validators.required],
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        speciality: ["", Validators.required],
        yearOfExperience: [0, Validators.required],
        idService: [0, Validators.required]
      });
    }
    this.options = ['Ophtalmologie', 'Dermatologie', 'Neurologie', 'Orthopédie', 'Psychiatrie','Cardiologie', 'Pédiatrie', 'Chirurgie', 'Gynécologie', 'Radiologie'];
    this.services = [];
    this.communicationService.getAllServices().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  submit() {
    if (this.registerForm.valid) {
      if (this.data) {
        this.communicationService.modifyMedecin(this.registerForm.value).subscribe({
          next: () => {
            this.dialogRef.close(this.registerForm.value);
          },
          error: (error) => {
            console.log(error);
          }
        });
      } else {
        this.communicationService.addMedecins(this.registerForm.value).subscribe({
          next: () => {
            this.dialogRef.close(this.registerForm.value);
              },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }
  }
}
