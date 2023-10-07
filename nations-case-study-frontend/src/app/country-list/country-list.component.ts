import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from '../models/country';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.countryService.getCountries().subscribe(countries => this.countries = countries);
  }
}
