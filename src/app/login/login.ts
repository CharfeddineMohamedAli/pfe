import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
    styleUrl: './login.scss'

})
export class LoginComponent {
  email = '';
  motPasse = '';

  constructor(private api: ApiService, private router: Router) {}

   goToInscription(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/inscription']);
  }

login() {
  this.email = this.email.toUpperCase();
  this.api.login({ email: this.email, password: this.motPasse }).subscribe({
    next: (res) => {
      if(this.email == "ADMIN"){
            this.router.navigate(['/admin-dashboard']);
      }
      else if (!res.approuve) {
        this.router.navigate(['/attente-approbation']);
      } else {
        // Enregistrement des informations de l'utilisateur
        localStorage.setItem('nom', JSON.stringify(res.nom));
        localStorage.setItem('role', JSON.stringify(res.role));

        // Redirection basée sur le rôle
        if (res.role === 'prestataire') {
          this.router.navigate(['/prestataire-dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }
    },
    error: () => alert('Email ou mot de passe incorrect.')
  });
}
}
