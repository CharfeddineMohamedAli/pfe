import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attente-approbation',
  imports: [],
  templateUrl: './attente-approbation.html',
  styleUrl: './attente-approbation.scss'
})
export class AttenteApprobation {
      constructor(private router: Router) {}

 goToLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
