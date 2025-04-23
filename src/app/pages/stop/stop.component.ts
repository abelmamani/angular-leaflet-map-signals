import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Stop } from '../../models/stop.model';
import { StopService } from '../../services/stop.service';
import { StopStore } from '../../store/stop.store';
import { MatIconModule } from '@angular/material/icon';
import { BusRouteStore } from '../../store/bus.route.store';

@Component({
  selector: 'app-stop',
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './stop.component.html',
  styleUrl: './stop.component.scss',
})
export class StopComponent implements OnInit {
  stopStore = inject(StopStore);
  busRouteStore = inject(BusRouteStore);
  stops: Stop[] | null = this.stopStore.stops();
  stopService = inject(StopService);

  ngOnInit(): void {
    this.busRouteStore.removeRoute();
    if (this.stops === null) {
      this.getStops();
    }
  }

  getStops() {
    this.stopService.getStops().subscribe({
      next: (stops) => {
        console.log('get stops');
        this.stops = stops;
        this.stopStore.updateStops(stops);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectStop(stop: Stop) {
    this.stopStore.updateStop(stop);
  }
}
