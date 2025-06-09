import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
    imports: [CommonModule],
      standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard implements OnInit {
  activeMenu: string= "";  // Initialize with null or any default value
  constructor() {}
  ngOnInit(): void {
   
  }
toggleSubmenu(menu: string) {
  this.activeMenu =  menu;

}
}
