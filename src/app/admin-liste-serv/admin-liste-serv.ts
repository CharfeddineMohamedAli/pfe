import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-liste-serv',
      imports: [CommonModule],
      standalone: true,
  templateUrl: './admin-liste-serv.html',
  styleUrl: './admin-liste-serv.scss'
})
export class AdminListeServ implements OnInit {
activeMenu: string | null = null;
services: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
  this.http.get<any[]>('http://localhost:8080/api/services').subscribe({
    next: (data) => {
      this.services = data.map(service => ({
        ...service,
        imageUrl: this.convertToImageUrl(service.image)
      }));
    },
    error: (err) => console.error('Erreur chargement services', err)
  });
}

convertToImageUrl(imageBytes: any): string {
  if (!imageBytes) return '';
  
  return `data:image/png;base64,${imageBytes}`; // ou 'image/jpeg' selon besoin
}

  deleteService(id: number) {
    if (confirm('Confirmer la suppression du service ?')) {
      this.http.delete(`http://localhost:8080/api/services/${id}`).subscribe({
        next: () => {
          this.services = this.services.filter(s => s.id !== id);
        },
        error: (err) => {
          console.error('Erreur suppression', err);
          alert('Erreur lors de la suppression.');
        }
      });
    }
  }

  editService(service: any) {
    // Ex: naviguer vers un formulaire d’édition, ou afficher un formulaire modifiable
    console.log('Modifier service', service);
    // Tu peux par exemple ouvrir un modal ou remplir un formulaire
  }
toggleSubmenu(menu: string) {
  this.activeMenu = this.activeMenu === menu ? null : menu;
}
}
