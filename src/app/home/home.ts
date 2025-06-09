import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Service } from '../services/api';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
    imports: [CommonModule],
      standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
services: Service[] = [];

    constructor(private router: Router, private apiService: ApiService) {}
    
  ngOnInit(): void {
   this.apiService.getServices().subscribe(data => {
    this.services = data;
  });
  }

 goToLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  goToInscription(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/inscription']);
  }
}
