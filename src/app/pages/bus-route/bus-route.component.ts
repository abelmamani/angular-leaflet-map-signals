import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BusRoute } from '../../models/bus.route.model';
import { BusRouteService } from '../../services/bus-route.service';
import { BusRouteStore } from '../../store/bus.route.store';

@Component({
  selector: 'app-bus-route',
  imports: [MatListModule, MatIconModule],
  templateUrl: './bus-route.component.html',
  styleUrl: './bus-route.component.scss',
})
export class BusRouteComponent implements OnInit {
  busRouteStore = inject(BusRouteStore);
  busRoutes: BusRoute[] | null = this.busRouteStore.busRoutes();
  busRouteService = inject(BusRouteService);

  ngOnInit(): void {
    if (this.busRoutes === null) {
      this.getBusRoutes();
    }
  }

  getBusRoutes() {
    this.busRouteService.getBusRoutes().subscribe({
      next: (res) => {
        console.log('get Routes');
        this.busRoutes = res;
        this.busRouteStore.updateRoutes(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getDetails(route: BusRoute) {
    this.busRouteStore.updateRoute(route);
  }

  getShapes(route: BusRoute) {
    this.busRouteService.getShapes(route.longName).subscribe({
      next: (res) => {
        route.shapes = res;
        this.getDetails(route);
      },
      error: (err) => {
        console.log('sin shapes');
      },
    });
  }
}
