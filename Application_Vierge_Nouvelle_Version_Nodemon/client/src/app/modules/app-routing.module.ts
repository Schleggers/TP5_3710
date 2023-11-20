import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { ListeMedecinsPageComponent } from "../pages/liste-medecins-page/liste-medecins-page.component";
import { CreatePageComponent } from "../pages/create-page/create-page.component";
import { ModifyPageComponent } from "../pages/modify-page/modify-page.component";
import { DeletePageComponent } from "../pages/delete-page/delete-page.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "medecins", component: ListeMedecinsPageComponent },
  { path: "create", component:  CreatePageComponent},
  { path: "modify", component: ModifyPageComponent },
  { path: "delete", component: DeletePageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
