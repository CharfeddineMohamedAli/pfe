import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Reservation, Service, Utilisateur } from '../services/api';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-dashboard',
    standalone: true,
  imports: [CommonModule, FormsModule],      // ✅ add CommonModule here
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  selectedSousServicesNames: string = '';

    groupedSousServices: any[] = [];
    totalBudget: number = 0;
idsous:any
ids:any
  showEventForm = false;
  nomUtilisateur: string = '';
  services: Service[] = [];
  storedNom: any;
  reservationsClient: any[] = [];
  reservations: boolean = false;
eventRequest = {
  typeEvenementId: 0,
  serviceIds: [] as number[], // ✅ tableau d’IDs
  dateDebut: '',
  dateFin: '',
  ville: '',
  budgetMax: 0
};servicesDuType: Service[] = [];
sousServices: any[] = [];

villes: string[] = [
  'Tunis', 'Sfax', 'Sousse', 'Gabès', 'Bizerte', 'Kairouan', 'Kasserine',
  'Monastir', 'Gafsa', 'Nabeul', 'Beja', 'Jendouba', 'Sidi Bouzid', 'Zarzis',
  'Mahdia', 'Medenine', 'Tozeur', 'Kebili', 'Siliana', 'Kef', 'Ben Arous',
  'Manouba', 'Ariana', 'Tataouine', 'Menzel Bourguiba', 'El Kef', 'Bou Salem',
  'Mateur', 'Douz', 'Kasserine', 'Hammamet', 'La Marsa', 'Radès', 'Kalaat es Senam',
  'Zaghouan', 'Sbeitla', 'El Jem', 'Thala', 'Moknine', 'Nefza', 'Tebourba'
];typesEvenement: any[] = []; // sera rempli par une API backend
utilisateur: any;
  constructor(private router: Router, private apiService: ApiService,   private cdr: ChangeDetectorRef,
    private http: HttpClient,  private toastr: ToastrService

) {}


ngOnInit() {

   this.http.get<any[]>('http://localhost:8080/api/types-evenement') // adapter selon ton URL
    .subscribe(data => {
      this.typesEvenement = data;
    });
  // Récupère les services disponibles
  this.apiService.getServices().subscribe(data => {
    this.services = data;
  });
  
  // Récupère le nom de l'utilisateur depuis le localStorage  
  const storedNomBrut = localStorage.getItem('nom');
  if (!storedNomBrut) {
    console.warn('Nom non trouvé dans le localStorage');
    return;
  }
  this.apiService.getUtilisateurBynom(storedNomBrut).subscribe({
      next: (data) => this.utilisateur = data,
      error: (err) => console.error('Erreur de chargement du profil', err)
    });
    this.chargerSousServices();

  this.nomUtilisateur = JSON.parse(storedNomBrut);
  const nomSansGuillemets = this.nomUtilisateur.replace(/"/g, '');
        this.cdr.detectChanges();

  // Charge les réservations du client
   this.apiService.getUserByNom(nomSansGuillemets).pipe(
      switchMap(user => this.apiService.getReservationsByClientId(user.id))
    ).subscribe({
      next: (reservations) => {
        this.reservationsClient = reservations;
        console.log(this.reservationsClient);
                this.reservations= true;

                this.cdr.detectChanges();
      },
      error: () => alert('Utilisateur introuvable')
    });
        this.cdr.detectChanges();

}

  chargerSousServices() {
    this.http.get<any[]>('http://localhost:8080/api/services').subscribe({
      next: (services) => {
        const allSousServices: any[] = [];

        services.forEach(service => {
          if (service.sousServices) {
            service.sousServices.forEach((ss: any) => {
              allSousServices.push({
                id: ss.id,
                ids: ss.ids,

                nom: ss.nom,
                prix: ss.prix,
                serviceName: service.nom // utile pour afficher
              });
            });
          }
        });

        this.sousServices = allSousServices;
        console.log(this.sousServices)
      },
      error: (err) => {
        console.error('Erreur lors du chargement des sous-services', err);
      }
    });
  }


  showForm() {
    this.showEventForm = !this.showEventForm;  // toggle true/false
    this.cdr.detectChanges();
  }
  isLocaleServiceSelected(): boolean {
    // Check if any of the selected services has the name "locale"
    return this.eventRequest.serviceIds.some(serviceId => {
      const service = this.servicesDuType.find(s => s.id === serviceId);
      return service && service.nom === "locale"; // or any other condition you want to check
    });
  }
  @ViewChild('vosReserv') vosReserv !: ElementRef;
  @ViewChild('profil') profil !: ElementRef;


   scrollToReser(): void {
     this.vosReserv.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToProfil(): void {
     this.profil.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

isOtherServiceSelected(): boolean {
  // Check if any selected service is NOT "locale"
  return this.eventRequest.serviceIds.some(serviceId => {
    const service = this.servicesDuType.find(s => s.id === serviceId);
    return service && service.nom !== 'locale';  // Check if the service name is NOT "locale"
  });
}  sousServicesForSelectedService = []; // Array to store sous-services for the selected service
  selectedSousServices: { [key: number]: any } = {};
  selectedServices: number[] = [];

selectedService: Service | null = null;
  selectedServiceIndex: number | null = null;
  startDate: string = '';
  endDate: string = '';

reserverService(sousid: any, sid: any,index:number) {
      this.selectedServiceIndex = index;

  console.log(sousid)
    console.log(sid)
this.idsous=sousid;
this.ids=sid;
    this.startDate = '';
    this.endDate = '';
  }
  isLocaleService(serviceId: number): boolean {
  // Your logic to detect locale service. For example:
  const service = this.services.find(s => s.id === serviceId);
  if (!service) return false;

  // Example: if service.nom === 'locale' or service.type === 'locale' or some condition
  return service.nom.toLowerCase() === 'locale'; 
  // or any other condition that identifies locale services
}

    getServiceName(serviceId: any): any {
    const service = this.servicesDuType.find(s => s.id === serviceId);
    console.log(service?.nom)
    return service ? service.nom : 'Unknown Service';
  }
envoyerReservation() {

  if (!this.startDate) {
    alert('Veuillez sélectionner une date de reservation.');
    return;
  }
const nom = localStorage.getItem('nom');
const clientNom = nom ? JSON.parse(nom) : null;

        const reservation = {
          sousserviceId:this.idsous,
          serviceId:this.ids,
          clientNom: clientNom,
          startDate: this.startDate,
        };

      this.apiService.creerReservationsous(reservation).subscribe({
        next: () => alert('Réservation effectuée !'),
        error: (err) => alert(err.error.message)
      });
        this.selectedService = null;
    this.selectedServiceIndex = null;
    this.startDate = '';
    this.endDate = '';
    }
 



annulerReservation() {
  this.selectedService = null;
  this.startDate = '';
  this.endDate = '';
}
getonefromSousServices(serviceId: any): any[] {
  const service = this.servicesDuType.find(s => s.id === serviceId);
  if (service) {
    // Filter out the "locale" sous-services
    const filteredSousServices = service.sousServices.filter(sousService => sousService.nom !== 'locale');
    return filteredSousServices;
  }
  return [];
}

getSousServices(serviceId: any): any[] {
  const service = this.servicesDuType.find(s => s.id === serviceId);
  if (service) {
    const filteredSousServices = service.sousServices
      .filter(sousService => sousService.nom !== 'locale')
      .filter((sousService, index, self) =>
        index === self.findIndex(s => s.nom === sousService.nom)
      );
    return filteredSousServices;
  }
  return [];
}
onSousServiceChange(serviceId: any, selectedSousServiceNom: any): void {

  this.selectedSousServices[serviceId] = selectedSousServiceNom.value;

  console.log(`Selected sous-service object for Service ID ${serviceId}:`, selectedSousServiceNom.value);

}

 onEventTypeChange(): void {
    if (this.eventRequest.typeEvenementId) {
      this.apiService.getServicesByEve(this.eventRequest.typeEvenementId).subscribe(data => {
        this.servicesDuType = data;
        console.log(this.servicesDuType)
      });
    }
}
sousServicesDisponibles: any[] = [];
rechercheEffectuee = false; // pour gérer l'affichage conditionnel
chercherSousServices() {

  
  const { typeEvenementId, dateDebut, ville, budgetMax } = this.eventRequest;

  if (!this.eventRequest.serviceIds || this.eventRequest.serviceIds.length === 0) {
    alert("Veuillez choisir au moins un service.");
    return;
  }

  // Create an array of selected sous-services
const selectedSousServices = this.eventRequest.serviceIds.map(serviceId => this.selectedSousServices[serviceId]);
console.log(this.selectedSousServices)
// Check if a sous-service is selected for each service
if (this.selectedSousServices==null) {
  alert("Veuillez sélectionner un sous-service pour chaque service.");
  return;
}

  // Send the request to the backend with all selected service and sous-service details
  this.http.get<any[]>(`http://localhost:8080/api/evenements/sous-services-disponibles`, {
    params: {
      typeEvenementId,
      serviceIds: this.eventRequest.serviceIds.join(','), // services selected
      sousServiceNames: selectedSousServices.join(','),    // corresponding sous-services
      dateDebut,
      ville,
      budgetMax
    }
  }).subscribe(data => {
    this.sousServicesDisponibles = data;
    this.generateSousServicePacks();

  });
}
calculateTotalBudget(subserviceName: string): number {
  return this.sousServicesDisponibles
    .filter(ss => ss.nom === subserviceName)
    .reduce((total, ss) => total + ss.prix, 0);
}

generateSousServicePacks(): void {
  const groupedByNom: { [key: string]: any[] } = {};

  // Group sous-services by `nom`
  this.sousServicesDisponibles.forEach(ss => {
    if (!groupedByNom[ss.nom]) {
      groupedByNom[ss.nom] = [];
    }
    groupedByNom[ss.nom].push(ss);
  });

  const allGroups = Object.values(groupedByNom);

  // Generate cartesian product of sous-services (one per `nom`)
  const cartesian = (arr: any[][]): any[][] => {
    return arr.reduce((a, b) => {
      return a.flatMap(d => b.map(e => [...d, e]));
    }, [[]]);
  };

  const packs = cartesian(allGroups);

  this.groupedSousServices = packs.map(pack => ({
    services: pack,
    total: pack.reduce((sum, s) => sum + s.prix, 0)
  }));
  console.log(this.groupedSousServices)
}
generatePackKey(ss: any): string {
  // You can generate key by combining unique fields like nom + prestataire
  return `${ss.nom}-${ss.prestataire.id}`;
}

reserverSousService(p:any) {
  
  if (!this.nomUtilisateur || !this.eventRequest.dateDebut ) {
    alert("Veuillez vous connecter et choisir des dates");
    return;
  }
  console.log(p)
  this.selectedSousServicesNames = p.services.map((s: any) => s.nom).join(', ');
  console.log('Selected sous-services:', this.selectedSousServicesNames);

  console.log(this.selectedSousServicesNames)



  const { typeEvenementId, dateDebut, ville, budgetMax } = this.eventRequest;

  this.apiService.getUserByNom(this.nomUtilisateur).subscribe(user => {
    const body = {
      clientId: user.id,
      serviceId: this.eventRequest.serviceIds.join(','),
sousServiceNom: this.selectedSousServicesNames,
      startDate: this.eventRequest.dateDebut,
      prix: budgetMax
    };

    this.http.post('http://localhost:8080/api/reservations', body).subscribe({
    next: () => this.toastr.success('Réservation envoyée pour validation 🎉', 'Succès'),
    error: err => this.toastr.error('Le service est déjà réservé pour cette période.')
    });
  });
}

deconnexion(){
  localStorage.setItem('nom','');
  this.router.navigate(["/login"]);
}

}
