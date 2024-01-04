import {Component} from '@angular/core';
import {Router, Params, ActivatedRoute} from '@angular/router';

import { RideService } from './services/rides.service';
import { Ride } from './models/ride';
// import { Artikel } from './models/artikel';
import { switchMap } from 'rxjs/operators';

@Component({
    moduleId: module.id,
    selector: 'dodaj-artikel',
    templateUrl: 'artikel-dodaj.component.html'
})
export class ArtikelDodajComponent {

    // artikel: Artikel = new Artikel;
    ride: Ride = new Ride;
    seznamId: number;
    private sub: any;

    constructor(private seznamiService: RideService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
           this.seznamId = +params['id'];
        });
      }

      ngOnDestroy() {
        this.sub.unsubscribe();
      }

    submitForm(): void {
        this.seznamiService.createRide(this.ride)
            .subscribe(() => this.router.navigate(['/seznami/' + this.seznamId]));
    }

    nazaj(): void {
        this.router.navigate(['/seznami']);
    }

}
