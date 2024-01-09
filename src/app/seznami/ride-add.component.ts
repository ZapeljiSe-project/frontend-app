import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';

import { RideService } from './services/rides.service';
import { TownService } from './services/towns.service';
import { Ride } from './models/ride';

@Component({
    moduleId: module.id,
    selector: 'add-ride',
    templateUrl: 'ride-add.component.html'
})
export class RideAddComponent implements OnInit {
    ride: Ride = new Ride;
    towns: string[] = [];
    // private sub: any;
    private datePipe: DatePipe;

    constructor(private rideService: RideService,
                private townService: TownService,
                private router: Router) {
        this.datePipe = new DatePipe('en-US');
    }

    ngOnInit() {
        // Fetch towns when the component initializes
        this.townService.getTowns().subscribe(towns => {
            this.towns = towns.map(town => town.name);
        });
    }

    ngOnDestroy() {
        // this.sub.unsubscribe();
    }

    get(){
        return sessionStorage.getItem('userId');
    }

    submitForm(): void {
        const formattedDate: string = this.datePipe.transform(this.ride.date, 'yyyy-MM-ddTHH:mm:ssZ');
        const dateObject = new Date(formattedDate);
        this.ride.date = dateObject;
        this.ride.userId = Number(this.get());

        this.rideService.createRide(this.ride)
            .subscribe(() => this.router.navigate(['/prevozi']));
    }

    back(): void {
        this.router.navigate(['/prevozi']);
    }
}
