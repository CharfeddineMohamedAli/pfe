import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-liste-serv',
      imports: [CommonModule, FormsModule],
      standalone: true,
  templateUrl: './admin-liste-serv.html',
  styleUrl: './admin-liste-serv.scss'
})
export class AdminListeServ implements OnInit {
activeMenu: string | null = null;
services: any[] = [];
selectedImage: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
  this.http.get<any[]>('http://localhost:8080/api/services').subscribe({
    next: (data) => {
      this.services = data.map(service => ({
        ...service,
        imageUrl: this.convertToImageUrl(service.image)
      }));
    },
    error: (err) => console.error('Erreur chargement services', err)
  });
}

convertToImageUrl(imageBytes: any): string {
  if (!imageBytes) return '';
  
  return `data:image/png;base64,${imageBytes}`; // ou 'image/jpeg' selon besoin
}
deleteService(id: number) {
  // Vérifie d'abord s'il y a des sous-services
  this.http.get<boolean>(`http://localhost:8080/api/services/${id}/hasSousServices`).subscribe({
    next: (hasSousServices: boolean) => {
      // Message de confirmation conditionnel
      let message = hasSousServices
        ? '⚠️ Ce service contient des sous-services. Voulez-vous vraiment tout supprimer ?'
        : 'Confirmer la suppression du service ?';

      if (confirm(message)) {
        // Suppression si l'utilisateur confirme
        this.http.delete(`http://localhost:8080/api/services/${id}`).subscribe({
          next: () => {
            // Met à jour la liste localement
            this.services = this.services.filter(s => s.id !== id);
            alert('Service supprimé avec succès.');
          },
          error: (err) => {
            console.error('Erreur suppression', err);
            alert('Erreur lors de la suppression.');
          }
        });
      }
    },
    error: (err) => {
      console.error('Erreur vérification des sous-services', err);
      alert('Erreur lors de la vérification des sous-services.');
    }
  });
}
selectedFile: File | null = null;

modalVisible = false;
selectedService: any = null;

openModal(service: any) {
  this.selectedService = { ...service };
  this.modalVisible = true;
}

closeModal(event?: any) {
  // si clic sur le background ou bouton annuler
  if (!event || event.target.classList.contains('modal')) {
    this.modalVisible = false;
  }
}
onUpdateService() {
  
  if (!this.selectedImage) {
    alert('Veuillez sélectionner une image');
    return;
  }
  const formData = new FormData();
  formData.append('nom', this.selectedService.nom);
  formData.append('description', this.selectedService.description);
  formData.append('prix', this.selectedService.prix);
  formData.append('prestataireId', this.selectedService.prestataireId || '1');
  formData.append('image', this.selectedImage);

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  this.http.put(`http://localhost:8080/api/services/${this.selectedService.id}`, formData).subscribe({
    next: (res) => {
      console.log('Service mis à jour', res);
      this.closeModal();
      this.loadServices(); // recharge la liste
  this.modalVisible = false;
        window.location.reload();
    },
    error: (err) => {
      console.error('Erreur MAJ', err);
    }
  });
}
toggleSubmenu(menu: string) {
  this.activeMenu = this.activeMenu === menu ? null : menu;
}

onImageSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedImage = input.files[0];
  }
}
}
