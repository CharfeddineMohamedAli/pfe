import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-ajout-prest',
   imports: [CommonModule, FormsModule],
      standalone: true,
  templateUrl: './admin-ajout-prest.html',
  styleUrl: './admin-ajout-prest.scss'
})
export class AdminAjoutPrest {
activeMenu: string | null = null;
  utilisateur: any = {
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    numTel: '',
    motPasse: '',
    role: 'prestataire'  // 👈 Important: fixed as 'prestataire'
  };
   constructor(private http: HttpClient) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.http.post('http://localhost:8080/api/utilisateurs', this.utilisateur)
        .subscribe({
          next: (res) => {
            alert('Prestataire ajouté avec succès !');
            form.resetForm();
          },
          error: (err) => {
            console.error(err);
            alert('Erreur lors de la création du prestataire.');
          }
        });
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
toggleSubmenu(menu: string) {
  this.activeMenu = this.activeMenu === menu ? null : menu;
}
}
