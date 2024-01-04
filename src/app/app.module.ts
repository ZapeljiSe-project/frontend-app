import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {RidesComponent} from './seznami/rides.component';
import {ArtikelDodajComponent} from './seznami/artikel-dodaj.component';
import {SeznamPodrobnostiComponent} from './seznami/seznam-podrobnosti.component';
import {RideService} from './seznami/services/rides.service';
import { Ride } from './seznami/models/ride';


@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        RidesComponent,
        SeznamPodrobnostiComponent,
        ArtikelDodajComponent
    ],
    providers: [RideService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

