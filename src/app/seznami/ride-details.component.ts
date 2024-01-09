import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import { DatePipe } from '@angular/common';

import { switchMap } from 'rxjs/operators';

import {Ride} from './models/ride';
import {RideService} from './services/rides.service';

@Component({
    moduleId: module.id,
    selector: 'ride-details',
    templateUrl: 'ride-details.component.html'
})
export class RideDetailsComponent implements OnInit {
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

    get(){
        return Number(sessionStorage.getItem('userId'));
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

    updateRide(ride: Ride): void {
        this.ride = ride;
        this.router.navigate(['/prevozi', this.ride.id, 'spremeni']);
    }

    formatDate(dateString: string): string {
        const originalDate: Date = new Date(dateString);
        const formattedDate: string = this.datePipe.transform(originalDate, 'dd.MM.yyyy');
        return formattedDate;
    }
}
