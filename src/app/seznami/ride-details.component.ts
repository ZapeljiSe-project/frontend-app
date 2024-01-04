import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';

import { switchMap } from 'rxjs/operators';

import {Ride} from './models/ride';
import {RideService} from './services/rides.service';

@Component({
    moduleId: module.id,
    selector: 'ride-details',
    templateUrl: 'ride-details.component.html'
})
export class RideDetailsComponent implements OnInit {
    ride: Ride;

    constructor(private rideService: RideService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
       this.route.params.pipe(
            switchMap((params: Params) => this.rideService.getRide(+params['id'])))
            .subscribe(ride => this.ride = ride);
    }

    back(): void {
        this.router.navigate(['prevozi']);
    }

    deleteRide(ride: Ride): void {
        this.rideService.deleteRide(ride.id)
        .subscribe(() => {
            // Delete operation completed successfully, navigate back
            this.back();
        });
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
