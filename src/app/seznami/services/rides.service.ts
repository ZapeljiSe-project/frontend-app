import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Ride } from '../models/ride';
import { Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
// import { Artikel } from '../models/artikel';

@Injectable()
export class RideService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private url = 'http://localhost:8080/v1/rides';

    constructor(private http: HttpClient) {
    }

    getRides(): Observable<Ride[]> {
        return this.http.get<Ride[]>(this.url)
            .pipe(
                catchError(this.handleError),
                map(rides => this.sortRidesById(rides)) // Sort rides by id
            );
    }

    getRide(id: number): Observable<Ride> {
        const url = `${this.url}/${id}`;
        return this.http.get<Ride>(url)
                        .pipe(catchError(this.handleError));
    }

    deleteRide(id: number): Observable<number> {
        const url = `${this.url}/${id}`;
        return this.http.delete<number>(url, {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    createRide(ride: Ride): Observable<Ride> {
        return this.http.post<Ride>(this.url, JSON.stringify(ride), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake.', error);
        return Promise.reject(error.message || error);
    }


    private sortRidesById(rides: Ride[]): Ride[] {
        return rides.sort((a, b) => b.id - a.id);
    }
}

