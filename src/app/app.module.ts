import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {RidesComponent} from './seznami/rides.component';
import {RideAddComponent} from './seznami/ride-add.component';
import {RideUpdateComponent} from './seznami/ride-update.component';
import {RideDetailsComponent} from './seznami/ride-details.component';
import {RideService} from './seznami/services/rides.service';


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
        RideUpdateComponent,
        RideDetailsComponent,
        RideAddComponent
    ],
    providers: [RideService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

