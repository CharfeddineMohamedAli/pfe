import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Utilisateur {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  motPasse: string;
  numTel?: string;
  adresse?: string;
  role?: string;
}
export interface TypeEvenementRequestDTO {
  titre: string;
  serviceIds: number[];
}

export interface SousService {
  id: number;
  nom: string;
  prix: number;
  ville: string;
  prestataire: {
    id: number;
    nom: string;
  };
}

export interface Service {
  id: number;
  nom: string;
  description: string;
  prix: number;
  nomPrestataire: string; // 💡 ajouter ce champ
  sousServices: SousService[];
}

export interface EventType {
  id: number;
  titre: string;
}
export interface Reservation {
    serviceId: number;
  clientId: number;
  startDate: string;
  endDate: string;
  // autres champs si besoin
}
@Injectable({ providedIn: 'root' })
export class ApiService {
    private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

   ajouterUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.baseUrl}/utilisateurs`, utilisateur);
  }

  getPrestatairesNonApprouves() {
  return this.http.get<Utilisateur[]>(`${this.baseUrl}/utilisateurs/prestataires/non-approuves`);
}

approuverUtilisateur(id: number) {
  return this.http.put(`${this.baseUrl}/utilisateurs/${id}/approuver`, {});
}

 getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/services`);
  }
  getServicesByEve(id: number): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/types-evenement/${id}/services`);
  }
  getEventTypes(): Observable<EventType[]> {
    return this.http.get<EventType[]>(`${this.baseUrl}/types-evenement`);
  }
    creerReservationsous(reservation: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservations/sous`, reservation);
  }
    creerReservation(reservation: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservations`, reservation);
  }
getUserByNom(nom: string): Observable<Utilisateur> {
  return this.http.get<Utilisateur>(`${this.baseUrl}/utilisateurs/nom/${nom}`);
}

getReservationsByClientId(clientId: number) {
  return this.http.get<Reservation[]>(`http://localhost:8080/api/reservations/client/${clientId}`);
}
updateSousService(id: number, updatedSousService: any): Observable<any> {
  return this.http.put<any>(`http://localhost:8080/api/sous-services/${id}`, updatedSousService);
}
deleteSousService(id: number): Observable<void> {
  return this.http.delete<void>(`http://localhost:8080/api/sous-services/${id}`);
}

 getUtilisateurBynom(nom: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`http://localhost:8080/api/utilisateurs/nom/${nom}`);
  }

}
