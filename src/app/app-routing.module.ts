import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RidesComponent } from './seznami/rides.component';
import { RideDetailsComponent } from './seznami/ride-details.component';
import { RideAddComponent } from './seznami/ride-add.component';
import { RideUpdateComponent } from './seznami/ride-update.component';

import { RegisterComponent } from './users/register.component';
import { LoginComponent } from './users/login.component';

const routes: Routes = [
    {path: '', redirectTo: '/prevozi', pathMatch: 'full'},
    {path: 'prevozi', component: RidesComponent},
    {path: 'prevozi/dodaj', component: RideAddComponent},
    {path: 'prevozi/:id', component: RideDetailsComponent},
    {path: 'prevozi/:id/spremeni', component: RideUpdateComponent},

    {path: 'registracija', component: RegisterComponent},
    {path: 'prijava', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
