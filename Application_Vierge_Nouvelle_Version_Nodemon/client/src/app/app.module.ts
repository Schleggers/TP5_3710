import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MedecinComponent } from './components/medecin/medecin.component';
import { MatTableModule } from "@angular/material/table";
import { ListeMedecinsPageComponent } from './pages/liste-medecins-page/liste-medecins-page.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormComponent } from './components/form/form.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { DeletePageComponent } from './pages/delete-page/delete-page.component';
import { ModifyPageComponent } from './pages/modify-page/modify-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MedecinComponent,
    ListeMedecinsPageComponent,
    FormComponent,
    DeletePageComponent,
    ModifyPageComponent,
    CreatePageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
  ],
  providers: [CommunicationService],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
