import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-ajouter-serv',
    imports: [CommonModule, FormsModule],
      standalone: true,
  templateUrl: './admin-ajouter-serv.html',
  styleUrl: './admin-ajouter-serv.scss'
})
export class AdminAjouterServ implements OnInit {
  selectedImage: File | null = null;

activeMenu: string | null = null;
  service: any = {
    nom: '',
    description: '',
      prestataire: {
      id: 0 // ⚠️ à remplir dynamiquement selon le prestataire connecté
    }
  };
  constructor(private http: HttpClient) {}
 ngOnInit() {

    this.service.prestataire.id = parseInt("1");

}

   onSubmit() {
  if (!this.service.prestataire.id) {
    alert('ID du prestataire manquant');
    return;
  }

  if (!this.selectedImage) {
    alert('Veuillez sélectionner une image');
    return;
  }

  const formData = new FormData();
  formData.append('nom', this.service.nom);
  formData.append('description', this.service.description);
  formData.append('prestataireId', this.service.prestataire.id.toString());
  formData.append('image', this.selectedImage);

  this.http.post('http://localhost:8080/api/services', formData)
    .subscribe({
      next: (res) => {
        alert('Service ajouté avec succès !');
        this.service = {
          nom: '',
          description: '',
          prestataire: { id: this.service.prestataire.id }
        };
        this.selectedImage = null;
      },
      error: (err) => {
        console.error(err);
        alert('Service existe déja.');
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
