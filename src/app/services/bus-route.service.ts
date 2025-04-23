import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusRoute } from '../models/bus.route.model';
import { Shape } from '../models/shape.model';

@Injectable({
  providedIn: 'root',
})
export class BusRouteService {
  private readonly url = 'https://macbus-api-rest/api/routes';

  constructor(private http: HttpClient) {}

  getBusRoutes(): Observable<BusRoute[]> {
    return this.http.get<BusRoute[]>(this.url);
  }

  getShapes(name: string): Observable<Shape[]>{
    return this.http.get<Shape[]>(`${this.url}/shapes/${name}`);
  }
}
