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
import {TownService} from './seznami/services/towns.service';

import {RegisterComponent} from './users/register.component';
import {UserService} from './users/services/users.service';


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
        RideAddComponent,
        
        RegisterComponent
    ],
    providers: [RideService, TownService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

