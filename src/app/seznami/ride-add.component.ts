import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';

import { RideService } from './services/rides.service';
import { Ride } from './models/ride';

@Component({
    moduleId: module.id,
    selector: 'add-ride',
    templateUrl: 'ride-add.component.html'
})
export class RideAddComponent implements OnInit {
    ride: Ride = new Ride;
    // private sub: any;
    private datePipe: DatePipe;

    constructor(private rideService: RideService,
                private router: Router) {
        this.datePipe = new DatePipe('en-US');
    }

    ngOnInit() {
        // this.sub.subscribe();
    }

    ngOnDestroy() {
        // this.sub.unsubscribe();
    }

    submitForm(): void {
        const formattedDate: string = this.datePipe.transform(this.ride.date, 'yyyy-MM-ddTHH:mm:ssZ');
        const dateObject = new Date(formattedDate);
        this.ride.date = dateObject;

        this.rideService.createRide(this.ride)
            .subscribe(() => this.router.navigate(['/prevozi']));
    }

    back(): void {
        this.router.navigate(['/prevozi']);
    }
}
