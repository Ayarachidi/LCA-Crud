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

  { 
    path: '', 
    component: LayoutechComponent,
    children: [
      { path: 'analyses', component: AnalyseComponent },
 
    ],
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_TECHNICIEN'] },
  },
 
];


