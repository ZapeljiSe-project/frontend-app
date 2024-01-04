import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';

import { switchMap } from 'rxjs/operators';

import {Ride} from './models/ride';
import {RideService} from './services/rides.service';

@Component({
    moduleId: module.id,
    selector: 'seznam-podrobnosti',
    templateUrl: 'seznam-podrobnosti.component.html'
})
export class SeznamPodrobnostiComponent implements OnInit {
    seznam: Ride;

    constructor(private seznamService: RideService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
       this.route.params.pipe(
            switchMap((params: Params) => this.seznamService.getRide(+params['id'])))
            .subscribe(seznam => this.seznam = seznam);
    }

    dodajArtikel(): void {
        this.router.navigate(['seznami/' + this.seznam.id + '/dodaj']);
    }

    nazaj(): void {
        this.router.navigate(['seznami']);
    }
}
