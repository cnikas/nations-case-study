import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { CountryStat } from '../models/country-stat';

@Component({
  selector: 'app-max-gdp-ratio',
  templateUrl: './max-gdp-ratio.component.html',
  styleUrls: ['./max-gdp-ratio.component.css'],
})
export class MaxGdpRatioComponent implements OnInit {
  
  stats: CountryStat[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.countryService
      .getCountryMaxGdpRatio()
      .subscribe((stats) => (this.stats = stats));
  }
}
