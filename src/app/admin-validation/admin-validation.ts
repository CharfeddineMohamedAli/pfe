import { Component } from '@angular/core';
import { ApiService, Utilisateur } from '../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-validation',
  imports: [CommonModule],
      standalone: true,
  templateUrl: './admin-validation.html',
  styleUrl: './admin-validation.scss'
})
export class AdminValidation {
prestataires: Utilisateur[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getPrestatairesNonApprouves().subscribe({
      next: (res) => this.prestataires = res,
      error: (err) => alert("Erreur de chargement")
    });
  }

  approuver(id: number) {
    this.api.approuverUtilisateur(id).subscribe({
  next: (res) => {
    console.log("Succès :", res);
    this.prestataires = this.prestataires.filter(u => u.id !== id);
    alert("Prestataire approuvé !");
  },
  error: (err) => {
    console.error("Erreur détectée :", err);
    alert("Erreur d'approbation.");
  }
});
  }
}
