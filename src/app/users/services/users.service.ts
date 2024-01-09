import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable()
export class UserService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private url = 'http://localhost:8081/v1/users';
    // private url = 'http://52.188.141.107/ms-user/v1/users';

    constructor(private http: HttpClient) {
    }

    registerUser(user: User): Observable<User> {
        const urlExtended: string = this.url + '/register';
        return this.http.post<User>(urlExtended, JSON.stringify(user), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    loginUser(user: User): Observable<User> {
        const urlExtended: string = this.url + '/login';
        return this.http.post<User>(urlExtended, JSON.stringify(user), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake.', error);
        return Promise.reject(error.message || error);
    }
}
