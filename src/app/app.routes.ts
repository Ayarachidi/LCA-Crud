import { Routes } from '@angular/router';
import { LaboratoiresComponent } from './laboratoires/laboratoires.component';
import { CrudcontactadresseComponent } from './crudcontactadresse/crudcontactadresse.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { LoginComponent } from './login/login.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import {LeftSidebarComponent} from './left-sidebar/left-sidebar.component';
import { AuthGuard } from './auth.guard';
import{LayoutComponent} from  './layout/layout.component';
import{LayoutechComponent} from  './layoutech/layoutech.component';
import{AnalyseComponent}from './analyse/analyse.component';
import { CrudEpreuveComponent } from './crud-epreuve/crud-epreuve.component';
import { CrudTestAnalyseComponent } from './crud-test-analyse/crud-test-analyse.component';
import { PatientComponent } from './patient/patient.component';
import { CrudDossierComponent } from './crud-dossier/crud-dossier.component';
import { InterfacepatientComponent } from './interfacepatient/interfacepatient.component';
export const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent, 
    children: [
      { path: 'laboratoires', component: LaboratoiresComponent },
      { path: 'utilisateurs', component: UtilisateurComponent },
      {
        path: 'crud-labo/:id',
        component: CrudcontactadresseComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }, // Rôle requis : ADMIN
      },
    ],
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'acceuil', component: AcceuilComponent },
  { path: 'espace-client', component: InterfacepatientComponent }, 

  { 
    path: '', 
    component: LayoutechComponent,
    children: [
      { path: 'analyses', component: AnalyseComponent },
      { path: 'patients', component: PatientComponent },
      { path: 'crud-epreuve/:id', component: CrudEpreuveComponent },
      { path: 'crud-testanalyse/:id', component: CrudTestAnalyseComponent },
      { path: 'crud-dossier/:id', component: CrudDossierComponent },
    ],
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_TECHNICIEN'] },
  },
 
];


