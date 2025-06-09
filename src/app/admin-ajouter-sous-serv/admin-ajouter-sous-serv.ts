import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-ajouter-sous-serv',
      imports: [CommonModule, FormsModule],
      standalone: true,
  templateUrl: './admin-ajouter-sous-serv.html',
  styleUrl: './admin-ajouter-sous-serv.scss'
})
export class AdminAjouterSousServ {
activeMenu: string | null = null;
 sousService = {
    nom: '',
    prix: 0,
    service: {
      id: 0 // ID du service sélectionné
    },
     ville: ''
  };

  services: any[] = [];
  selectedFile?: File;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.http.get<any[]>('http://localhost:8080/api/services')
      .subscribe({
        next: (res) => this.services = res,
        error: (err) => console.error('Erreur chargement services', err)
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.sousService.service.id) {
      alert('Veuillez choisir un service.');
      return;
    }

    this.http.post('http://localhost:8080/api/sous-services', this.sousService)
      .subscribe({
        next: () => {
          alert('Sous-service ajouté avec succès !');
          this.sousService = {
            nom: '',
            prix: 0,
            service: { id: 0 },
            ville:''
          };
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de l\'ajout.');
        }
      });
  }
toggleSubmenu(menu: string) {
  this.activeMenu = this.activeMenu === menu ? null : menu;
}
}
