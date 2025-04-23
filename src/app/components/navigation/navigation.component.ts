import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MapComponent,
    MatTabsModule,
    RouterOutlet,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  router = inject(Router);
  links = [
    {
      label: 'Paradas',
      route: 'stop',
      icon: 'location_on',
    },
    {
      label: 'Lineas',
      route: 'bus-route',
      icon: 'directions_bus',
    },
  ];
  getActivedLink(): string {
    const currentUrl = this.router.url;
    return currentUrl.split('/')[1]; 
  }
}
