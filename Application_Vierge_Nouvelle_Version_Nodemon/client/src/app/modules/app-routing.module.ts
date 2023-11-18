import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { ListeMedecinsPageComponent } from "../pages/liste-medecins-page/liste-medecins-page.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  {path: "medecins", component: ListeMedecinsPageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
