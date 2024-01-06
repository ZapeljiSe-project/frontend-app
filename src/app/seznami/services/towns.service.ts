import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Town } from '../models/town';

@Injectable()
export class TownService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private url = 'http://localhost:8080/v1/town';
    // private url = 'http://20.253.101.2/ms-ride/v1/town';

    constructor(private http: HttpClient) {
    }

    getTowns(): Observable<Town[]> {
        return this.http.get<Town[]>(this.url)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake.', error);
        return Promise.reject(error.message || error);
    }
}