import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-liste-sous-serv',
      imports: [CommonModule],
      standalone: true,
  templateUrl: './admin-liste-sous-serv.html',
  styleUrl: './admin-liste-sous-serv.scss'
})
export class AdminListeSousServ implements OnInit {
activeMenu: string | null = null;
sousServices: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chargerSousServices();
  }

  chargerSousServices() {
    this.http.get<any[]>('http://localhost:8080/api/services').subscribe({
      next: (services) => {
        const allSousServices: any[] = [];

        services.forEach(service => {
          if (service.sousServices) {
            service.sousServices.forEach((ss: any) => {
              allSousServices.push({
                id: ss.id,
                nom: ss.nom,
                prix: ss.prix,
                serviceName: service.nom // utile pour afficher
              });
            });
          }
        });

        this.sousServices = allSousServices;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des sous-services', err);
      }
    });
  }

  modifierSousService(sous: any) {
    // Logique de modification à implémenter ou redirection vers formulaire
    console.log('Modifier :', sous);
  }

  supprimerSousService(sousService: any) {
     if (!sousService?.id) {
    console.error('Sous-service ID is undefined!', sousService);
    return;
  }
    if (confirm('Êtes-vous sûr de vouloir supprimer ce sous-service ?')) {
      this.http.delete(`http://localhost:8080/api/sous-services/${!sousService?.id}`).subscribe({
        next: () => {
          alert('Sous-service supprimé.');
        },
        error: (err) => {
          console.error('Erreur suppression', err);
          alert('Erreur lors de la suppression.');
        }
      });
    }
  }
toggleSubmenu(menu: string) {
  this.activeMenu = this.activeMenu === menu ? null : menu;
}
}
