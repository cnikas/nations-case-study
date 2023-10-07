import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { MaxGdpRatioComponent } from './max-gdp-ratio/max-gdp-ratio.component';
import { StatsTableComponent } from './stats-table/stats-table.component';
import { LanguagesComponent } from './languages/languages.component';

const routes: Routes = [
  { path: '', redirectTo: '/country-list', pathMatch: 'full' },
  { path: 'country-list', component: CountryListComponent },
  { path: 'max-gdp-ratio', component: MaxGdpRatioComponent },
  { path: 'stats-table', component: StatsTableComponent },
  { path: 'languages/:id', component: LanguagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
