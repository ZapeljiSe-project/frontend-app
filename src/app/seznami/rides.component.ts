import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Ride } from './models/ride';
import { RideService } from './services/rides.service';

@Component({
    moduleId: module.id,
    selector: 'all-rides',
    templateUrl: 'rides.component.html'
})
export class RidesComponent implements OnInit {
    private datePipe: DatePipe;
    rides: Ride[];
    ride: Ride;

    // Properties to currently logged user data.
    username: string;
    name: string;

    constructor(private rideService: RideService,
                private router: Router) {
        this.datePipe = new DatePipe('en-US');
    }

    ngOnInit(): void {
        this.getRides();

        this.username = this.getUsername();
        this.name = this.getName();
    }

    dataSaveLogout(){
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('phone');
    }

    get(){
        return sessionStorage.getItem('userId');
    }

    getUsername(){
        return sessionStorage.getItem('username');
    }

    getName(){
        return sessionStorage.getItem('name');
    }

    toRegister(): void {
        this.router.navigate(['/registracija']);
    }

    toLogin(): void {
        this.router.navigate(['/prijava']);
    }

    changeMyData(): void {
        this.router.navigate(['/moji-podatki']);
    }

    /*getRides(): void {
        this.rideService
            .getRides()
            .subscribe(rides => this.rides = rides);
    }*/

    getRides(): void {
        this.rideService
            .getRides()
            .subscribe(rides => {
                this.rides = rides.map(ride => {
                    const dateString: string = ride.date.toString();
                    const dateWithoutBrackets = dateString.replace(/\[.*\]/, '');
                    const dateObject: Date = new Date(dateWithoutBrackets);
                    const formattedDate: string = this.datePipe.transform(dateObject, 'yyyy-MM-dd');
                    const dateObjectFinal = new Date(formattedDate);
    
                    // Update the ride object with the formatted date
                    return { ...ride, date: dateObjectFinal };
                });
            });
    }

    toDetails(ride: Ride): void {
        this.ride = ride;
        this.router.navigate(['/prevozi', this.ride.id]);
    }

    addRide(): void {
        this.router.navigate(['prevozi/dodaj']);
    }

    formatDate(dateString: string): string {
        const originalDate: Date = new Date(dateString);
        const formattedDate: string = this.datePipe.transform(originalDate, 'dd.MM.yyyy');
        return formattedDate;
    }
}
