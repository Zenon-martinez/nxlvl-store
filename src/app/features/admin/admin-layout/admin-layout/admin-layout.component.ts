import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../components/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../components/admin-header/admin-header.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminSidebarComponent, AdminHeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {}
