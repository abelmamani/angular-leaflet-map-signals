import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { BusRouteStore } from '../../store/bus.route.store';
import { StopStore } from '../../store/stop.store';
@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;
  private map!: L.Map | null;
  stopStore = inject(StopStore);
  busRouteStore = inject(BusRouteStore);
  stops = this.stopStore.stops;
  selectedStop = this.stopStore.stop
  busRoute = this.busRouteStore.busRoute;
  private polyline: L.Polyline | null = null;
  markers: L.CircleMarker[] = [];
  constructor() {
    effect(() => {
      const route = this.busRoute();
      const shapes = route?.shapes;

      if (this.stops() && this.map) {
        this.updateStopMarkers();
      }

      if(this.selectedStop() && this.map){
        this.updateStopMarker();
      }

      if (shapes && this.map) {
        const shapeCoords: [number, number][] = shapes.map((shape) => [
          shape.latitude,
          shape.longitude,
        ]);
        this.updateShapes(shapeCoords);
      }
    });
  }
  ngAfterViewInit(): void {
    this.initMap(-29.176179, -67.4932864, 15);
  }
  initMap(lat: number, lng: number, zoom: number): void {
    this.map = new L.Map(this.mapContainer.nativeElement).setView(
      [lat, lng],
      zoom
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  updateShapes(shape: [number, number][]): void {
    if (this.map) {
      if (this.polyline) {
        this.map.removeLayer(this.polyline);
      }

      this.polyline = L.polyline(shape, {
        color: 'black',
        weight: 3,
        dashArray: '10 10',
      }).addTo(this.map);

      this.map.fitBounds(this.polyline.getBounds(), { padding: [20, 20] });
    }
  }

  updateStopMarkers(): void {
    if (this.stops() && this.map) {
  
      this.markers = (this.stops() || []).map((stop) => {
        const marker = L.circleMarker([stop.latitude, stop.longitude], {
          color: 'black',
          fillColor: 'white',
          radius: 6,
          fillOpacity: 0.5,
        }).bindPopup(stop.name, {
     
        });
        marker.addTo(this.map!);
        return marker;
      });
    }
  }
  updateStopMarker(): void {
    const selectedName = this.selectedStop()?.name;
    if (!selectedName) return;
  
    const marker = this.markers.find(marker => {
      const popup = marker.getPopup();
      return popup && popup.getContent() === selectedName;
    });

    this.map?.setView(marker?.getLatLng()!, 15);
  
    marker?.openPopup();
  }
  
}
