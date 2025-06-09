import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-admin-liste-presta',
      imports: [CommonModule, FormsModule],
      standalone: true,
  templateUrl: './admin-liste-presta.html',
  styleUrl: './admin-liste-presta.scss'
})

export class AdminListePresta {
activeMenu: string | null = null;

  prestataires: any[] = [];

  constructor(private http: HttpClient, private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/utilisateurs/prestataires')
      .subscribe({
        next: (data) => this.prestataires = data,
        error: (err) => console.error('Erreur chargement prestataires', err)
      });
  }

  deletePrestataire(id: number) {
    this.http.delete(`http://localhost:8080/api/utilisateurs/${id}`).subscribe(() => {
      this.prestataires = this.prestataires.filter(p => p.id !== id);
    });
  }
editMode = false;
selectedPrestataire: any = null;

editPrestataire(prestataire: any) {
  this.selectedPrestataire = { ...prestataire }; // clone to avoid binding issues
  this.editMode = true;
}
updatePrestataire() {
  if (!this.selectedPrestataire) return;

  this.http.put(`http://localhost:8080/api/utilisateurs/${this.selectedPrestataire.id}`, this.selectedPrestataire)
    .subscribe({
      next: () => {
        // Replace old data in the list
        const index = this.prestataires.findIndex(p => p.id === this.selectedPrestataire.id);
        if (index !== -1) {
          this.prestataires[index] = { ...this.selectedPrestataire };
        }
        this.editMode = false;
        this.selectedPrestataire = null;
      },
      error: (err) => {
        console.error('Erreur modification', err);
        alert('Erreur lors de la mise à jour du prestataire.');
      }
    });
}

cancelEdit() {
  this.selectedPrestataire = null;
  this.editMode = false;
}
  
toggleSubmenu(menu: string) {
  this.activeMenu = this.activeMenu === menu ? null : menu;
}

approuver(id: number, prestataire: any) {

  this.api.approuverUtilisateur(id).subscribe({
    next: (res) => {
      console.log("Succès :", res);
           this.http.get<any[]>('http://localhost:8080/api/utilisateurs/prestataires')
      .subscribe({
        next: (data) =>{ this.prestataires = data;
          alert('Prestataire approuvée');
        },
        error: (err) => console.error('Erreur chargement prestataires', err)
      });
            this.cdr.detectChanges();

    },
    error: (err) => {
      console.error("Erreur détectée :", err);
      alert("Erreur d'approbation.");
    }
  });
}

}
