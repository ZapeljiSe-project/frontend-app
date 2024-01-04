import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { Ride } from './models/ride';
import { RideService } from './services/rides.service';

@Component({
    moduleId: module.id,
    selector: 'all-rides',
    templateUrl: 'rides.component.html'
})
export class RidesComponent implements OnInit {
    rides: Ride[];
    ride: Ride;

    constructor(private rideService: RideService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getRides();
    }

    getRides(): void {
        this.rideService
            .getRides()
            .subscribe(rides => this.rides = rides);
    }

    toDetails(ride: Ride): void {
        this.ride = ride;
        this.router.navigate(['/prevozi', this.ride.id]);
    }

    addRide(): void {
        this.router.navigate(['prevozi/dodaj']);
    }

    formatDate(dateString: string): string {
        if (!dateString) {
          return '';
        }
      
        // Extract components of the date string
        const year = dateString.substring(0, 4);
        const month = dateString.substring(5, 7);
        const day = dateString.substring(8, 10);
      
        // Format: DD.MM.YYYY
        return `${day}.${month}.${year}`;
    }
}
