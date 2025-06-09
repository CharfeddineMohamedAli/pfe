import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Service, TypeEvenementRequestDTO } from '../services/api';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-ajouter-eve',
    imports: [CommonModule,FormsModule],
      standalone: true,
  templateUrl: './admin-ajouter-eve.html',
  styleUrl: './admin-ajouter-eve.scss'
})
export class AdminAjouterEve implements OnInit {
  activeMenu: string | null = null;
typeEvenement: TypeEvenementRequestDTO = {
    titre: '',
    serviceIds: []
  };

  services: Service[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.http.get<Service[]>('http://localhost:8080/api/services')  // Adjust endpoint if needed
      .subscribe({
        next: (data) => this.services = data,
        error: (err) => console.error('Failed to load services', err)
      });
  }

  onSubmit(): void {
    this.http.post('http://localhost:8080/api/types-evenement', this.typeEvenement)
      .subscribe({
        next: (response) => {
          alert('Type d\'événement ajouté avec succès!');
          this.typeEvenement = { titre: '', serviceIds: [] }; // reset form
        },
        error: (error) => {
          alert('Erreur lors de l\'ajout');
          console.error(error);
        }
      });
  }
toggleSubmenu(menu: string) {
  this.activeMenu = this.activeMenu === menu ? null : menu;
}
}
