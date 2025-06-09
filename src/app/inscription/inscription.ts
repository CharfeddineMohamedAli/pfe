import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService, Utilisateur } from '../services/api';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription',
    standalone: true,
  imports: [ ReactiveFormsModule,
    HttpClientModule,
  CommonModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.scss'
})
export class Inscription {
clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      motPasse: ['', Validators.required],
      numTel: [''],
      adresse: [''],
      role: ['', Validators.required]  // rôle par défaut
    });
  }

  onSubmit() {
     if (this.clientForm.valid) {
    const utilisateur: Utilisateur = this.clientForm.value;

    this.api.ajouterUtilisateur(utilisateur).subscribe({
      next: (res) => {
        if (utilisateur.role === 'client') {
                  localStorage.setItem('nom', JSON.stringify(utilisateur.nom));
this.router.navigateByUrl('/dashboard', { state: { nom: utilisateur.nom } });
        } else {
          // Optionnel : afficher une page de confirmation
          this.router.navigate(['/attente-approbation']);
        }
      },
      error: (err) => {
        console.error('Erreur lors de l’inscription', err);
        alert('Un compte existe déjà avec cet e-mail');
      }
    });
  }
}


   goToLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
