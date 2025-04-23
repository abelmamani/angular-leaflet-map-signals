import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'stop', pathMatch: 'full' },
  {
    path: 'stop',
    loadComponent: () =>
      import('./pages/stop/stop.component').then((m) => m.StopComponent),
  },
  {
    path: 'bus-route',
    loadComponent: () =>
      import('./pages/bus-route/bus-route.component').then(
        (m) => m.BusRouteComponent
      ),
  },
];
