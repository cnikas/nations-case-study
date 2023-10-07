import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component';
import { MaxGdpRatioComponent } from './max-gdp-ratio/max-gdp-ratio.component';
import { StatsTableComponent } from './stats-table/stats-table.component';
import { HttpClientModule } from '@angular/common/http';
import { LanguagesComponent } from './languages/languages.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    MaxGdpRatioComponent,
    StatsTableComponent,
    LanguagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
