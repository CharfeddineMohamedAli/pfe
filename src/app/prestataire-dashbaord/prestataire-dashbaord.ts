import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService, EventType, Service, SousService } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prestataire-dashbaord',
    imports: [CommonModule,FormsModule ],
      standalone: true,
  templateUrl: './prestataire-dashbaord.html',
  styleUrl: './prestataire-dashbaord.scss'
})
export class PrestataireDashbaord implements OnInit{
eventTypes: EventType[] = [];
  services: Service[] = [];
  selectedEventTypeId: number | null = null;
  sousServices: SousService[] = [];
    selectedServiceId: number | null = null;
    showEventForm = false;
      nom: string = '';
      description: string = '';
        prix = '';
          ville = '';
utilisateur : any;

  constructor(private apiService: ApiService, private http:HttpClient, private router: Router,private toastr: ToastrService) {
   
  }

   ngOnInit(): void {
    this.apiService.getEventTypes().subscribe(data => {
      this.eventTypes = data;
    });
     const storedNom = localStorage.getItem('nom');
    if (storedNom) {
      this.nom = JSON.parse(storedNom);
       this.http.get<SousService[]>(`http://localhost:8080/api/sous-services/by-user-nom?nom=${this.nom}`)
    .subscribe(services => {
      this.sousServices = services;
    });
    }
        this.apiService.getUtilisateurBynom(this.nom).subscribe({
      next: (data) => this.utilisateur = data,
      error: (err) => console.error('Erreur de chargement du profil', err)
    });
    this.fetchReservations();
          this.apiService.getServices().subscribe(data => {
        this.services = data;
                this.selectedServiceId = null; 
      });

  }


villes: string[] = [
  'Tunis', 'Sfax', 'Sousse', 'Gabès', 'Bizerte', 'Kairouan', 'Kasserine',
  'Monastir', 'Gafsa', 'Nabeul', 'Beja', 'Jendouba', 'Sidi Bouzid', 'Zarzis',
  'Mahdia', 'Medenine', 'Tozeur', 'Kebili', 'Siliana', 'Kef', 'Ben Arous',
  'Manouba', 'Ariana', 'Tataouine', 'Menzel Bourguiba', 'El Kef', 'Bou Salem',
  'Mateur', 'Douz', 'Kasserine', 'Hammamet', 'La Marsa', 'Radès', 'Kalaat es Senam',
  'Zaghouan', 'Sbeitla', 'El Jem', 'Thala', 'Moknine', 'Nefza', 'Tebourba'
];

onSubmit(): void {
  if (!this.selectedServiceId) {
    alert("Veuillez sélectionner un service.");
    return;
  }


  const storedNom = localStorage.getItem('nom');
  if (!storedNom) {
    alert("Utilisateur non identifié !");
    return;
  }

  const sousServicePayload = {
    nom:this.nom,
     description:this.description,
    ville: this.ville,
    prix:this.prix,
    service: { id: this.selectedServiceId },
    prestataire: { nom: JSON.parse(storedNom) }  // Pass the prestataire by nom
  };

  this.http.post('http://localhost:8080/api/sous-services', sousServicePayload)
    .subscribe({
      next: () => {
        alert('Sous-service ajouté avec succès !');
        this.sousServices = []; // Reset
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de l'ajout du sous-service.");
      }
    });
}

   showForm() {
    this.showEventForm = !this.showEventForm;  // toggle true/false
  }
   @ViewChild('vosServicesSection') vosServicesSection!: ElementRef;
 @ViewChild('vosReserv') vosReserv !: ElementRef;
  @ViewChild('profil') profil !: ElementRef;

  scrollToSection(): void {
    this.vosServicesSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

   scrollToReser(): void {
     this.vosReserv.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToProfil(): void {
     this.profil.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  reservations: any[] = [];

fetchReservations(): void {
  if (this.nom) {
    this.http.get<any[]>(`http://localhost:8080/api/reservations/prestataire?prestataireNom=${this.nom}`)
      .subscribe(data => {
        this.reservations = data;
      });
  }
}

updateReservationStatus(reservation: any, status: string): void {
  const url = `http://localhost:8080/api/reservations/update-status`;

  const requestBody = {
    sousServiceIds: reservation.sousServices.map((ss: any) => ss.id),
    date: reservation.date,
    statut: status.toUpperCase() // e.g., "APPROUVEE"
  };

  this.http.put(url, requestBody).subscribe({
  next: () => {
    this.toastr.success('Réservation envoyée pour validation 🎉', 'Succès');
window.location.reload();
    // Call fetch method here
    this.fetchReservations(); // Replace with the actual method name if different
  },
  error: err => {
    this.toastr.error('Le service est déjà réservé pour cette période.');
  }
});
}


 


deconnexion(){
  localStorage.setItem('nom','');
  this.router.navigate(["/login"]);
}

onModifierSousService(sousService: any) {
  this.apiService.updateSousService(sousService.id, sousService)
    .subscribe(response => {
      console.log("Sous-service mis à jour avec succès", response);
    });
}

onSupprimerSousService(sousService: any) {
  if (confirm(`Êtes-vous sûr de vouloir supprimer "${sousService.nom}" ?`)) {
    this.apiService.deleteSousService(sousService.id).subscribe(() => {
      this.sousServices = this.sousServices.filter(ss => ss.id !== sousService.id);
      console.log("Sous-service supprimé !");
    });
  }
}
editingId: number | null = null;
editForm: any = {
  nom: '',
  prix: null,
  ville: ''
};

startEdit(sousService: any): void {
  this.editingId = sousService.id;
  this.editForm = { ...sousService }; // copie des données actuelles
}

cancelEdit(): void {
  this.editingId = null;
  this.editForm = { nom: '', prix: null, ville: '' };
}

submitEdit(): void {
  if (this.editingId !== null) {
    this.apiService.updateSousService(this.editingId, this.editForm).subscribe(updated => {
      // Mettre à jour dans la liste locale
      const index = this.sousServices.findIndex(ss => ss.id === this.editingId);
      if (index !== -1) this.sousServices[index] = updated;

      this.cancelEdit();
    });
  }
}


}
