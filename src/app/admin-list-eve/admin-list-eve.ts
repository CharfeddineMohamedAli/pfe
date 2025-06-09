import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-list-eve',
    imports: [CommonModule,FormsModule],
      standalone: true,
  templateUrl: './admin-list-eve.html',
  styleUrl: './admin-list-eve.scss'
})
export class AdminListEve {
    activeMenu: string | null = null;
     typesEvenement: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/types-evenement')
      .subscribe(data => {
        this.typesEvenement = data;
      });
  }
toggleSubmenu(menu: string) {
  this.activeMenu = this.activeMenu === menu ? null : menu;
}

updateTypeEvenement(id: number, data: any): Observable<any> {
  return this.http.put(`http://localhost:8080/api/types-evenement/${id}`, data);
}

deleteTypeEvenement(id: number): Observable<any> {
  return this.http.delete(`http://localhost:8080/api/types-evenement/${id}`);
}

modifierType(type: any) {
  const nouveauTitre = prompt('Modifier le nom du type :', type.titre);
  if (nouveauTitre && nouveauTitre.trim()) {
    const updated = { ...type, titre: nouveauTitre };
    this.updateTypeEvenement(type.id, updated).subscribe(() => {
    });
  }
}

supprimerType(type: any) {
  if (confirm(`Êtes-vous sûr de vouloir supprimer "${type.titre}" ?`)) {
    this.deleteTypeEvenement(type.id).subscribe(() => {
    });
  }
}
}
