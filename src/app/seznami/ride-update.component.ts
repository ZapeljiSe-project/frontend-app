import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';

import { switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

import { RideService } from './services/rides.service';
import { Ride } from './models/ride';

@Component({
    moduleId: module.id,
    selector: 'update-ride',
    templateUrl: 'ride-update.component.html'
})
export class RideUpdateComponent implements OnInit {
    private datePipe: DatePipe;
    ride: Ride;

    constructor(private rideService: RideService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
        this.datePipe = new DatePipe('en-US');
    }

    ngOnInit(): void {
        // this.route.params.pipe(
        //     switchMap((params: Params) => this.rideService.getRide(+params['id'])))
        //     .subscribe(ride => this.ride = ride);

        this.route.params.pipe(
            switchMap((params: Params) => this.rideService.getRide(+params['id'])))
            .subscribe(ride => {
                this.ride = ride;

                const dateString: string = this.ride.date.toString();
                const dateWithoutBrackets = dateString.replace(/\[.*\]/, '');
                const dateObject: Date = new Date(dateWithoutBrackets);
                const formattedDate: string = this.datePipe.transform(dateObject, 'yyyy-MM-dd');
                const dateObjectFinal = new Date(formattedDate);
                this.ride.date = dateObjectFinal;
            });
    }

    ngOnDestroy() { }

    submitForm(): void {
        const formattedDate: string = this.datePipe.transform(this.ride.date, 'yyyy-MM-ddTHH:mm:ssZ');
        const dateObject = new Date(formattedDate);
        this.ride.date = dateObject;

        this.rideService.updateRide(this.ride)
            .subscribe(() => this.router.navigate(['/prevozi', this.ride.id]));
    }

    back(): void {
        this.router.navigate(['/prevozi', this.ride.id]);
    }
}
