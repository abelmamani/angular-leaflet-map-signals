import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stop } from '../models/stop.model';

@Injectable({
  providedIn: 'root',
})
export class StopService {
  private readonly url: string =
    'https://macbus-api-rest-sigma.vercel.app/api/stops';

  constructor(private http: HttpClient) {}

  getStops(): Observable<Stop[]>{
    return this.http.get<Stop[]>(this.url);
  }
}
