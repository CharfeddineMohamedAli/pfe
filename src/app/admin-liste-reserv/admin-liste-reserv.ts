import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../services/api';

@Component({
  selector: 'app-admin-liste-reserv',
      imports: [CommonModule],
      standalone: true,
  templateUrl: './admin-liste-reserv.html',
  styleUrl: './admin-liste-reserv.scss'
})
export class AdminListeReserv {
activeMenu: string | null = null;
  reservations: any[] = [];

toggleSubmenu(menu: string) {
  this.activeMenu = this.activeMenu === menu ? null : menu;
}
private apiUrl = 'http://localhost:8080/api/reservations'; // URL de ton backend

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }
   ngOnInit(): void {
    this.getAllReservations().subscribe((data: Reservation[]) => {
      this.reservations = data;
    });
  }
}
