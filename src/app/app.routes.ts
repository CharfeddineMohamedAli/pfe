import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Home } from './home/home';
import { Inscription } from './inscription/inscription';
import { AttenteApprobation } from './attente-approbation/attente-approbation';
import { AdminValidation } from './admin-validation/admin-validation';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { PrestataireDashbaord } from './prestataire-dashbaord/prestataire-dashbaord';
import { AdminAjouterEve } from './admin-ajouter-eve/admin-ajouter-eve';
import { AdminListEve } from './admin-list-eve/admin-list-eve';
import { AdminAjoutPrest } from './admin-ajout-prest/admin-ajout-prest';
import { AdminListePresta } from './admin-liste-presta/admin-liste-presta';
import { AdminAjouterServ } from './admin-ajouter-serv/admin-ajouter-serv';
import { AdminListeServ } from './admin-liste-serv/admin-liste-serv';
import { AdminAjouterSousServ } from './admin-ajouter-sous-serv/admin-ajouter-sous-serv';
import { AdminListeSousServ } from './admin-liste-sous-serv/admin-liste-sous-serv';
import { AdminListeReserv } from './admin-liste-reserv/admin-liste-reserv';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: Dashboard },
   { path: 'inscription', component: Inscription },
   { path: '', component: Home },
    { path: 'attente-approbation', component: AttenteApprobation },
        { path: 'admin-validation', component: AdminValidation },
            { path: 'admin-dashboard', component: AdminDashboard },
              { path: 'prestataire-dashboard', component: PrestataireDashbaord },
                            { path: 'ajouter-evenement', component: AdminAjouterEve },
                            { path: 'liste-evenement', component: AdminListEve },
                            { path: 'ajouter-prestataire', component: AdminAjoutPrest },
                                                     { path: 'liste-prestataires', component: AdminListePresta },
                   { path: 'ajouter-service', component: AdminAjouterServ },
                    { path: 'liste-services', component: AdminListeServ },
                       { path: 'ajouter-sous-services', component: AdminAjouterSousServ },
                       { path: 'liste-sous-services', component: AdminListeSousServ },
                                              { path: 'liste-reservations', component: AdminListeReserv },



   
];