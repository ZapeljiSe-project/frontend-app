import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { RidesComponent } from './seznami/rides.component';
import { SeznamPodrobnostiComponent } from './seznami/seznam-podrobnosti.component';
import { ArtikelDodajComponent } from './seznami/artikel-dodaj.component';

const routes: Routes = [
    {path: '', redirectTo: '/prevozi', pathMatch: 'full'},
    {path: 'prevozi', component: RidesComponent},
    {path: 'seznami/:id', component: SeznamPodrobnostiComponent},
    {path: 'seznami/:id/dodaj', component: ArtikelDodajComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
