import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../country.service';
import { CountryLanguage } from '../models/country-language';
import { Country } from '../models/country';
@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css'],
})
export class LanguagesComponent implements OnInit {
  countryLanguages: CountryLanguage[] = [];
  country: Country = {} as Country;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    const countryId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.countryService
      .getCountry(countryId)
      .subscribe((country) => (this.country= country));
    this.countryService
      .getLanguages(countryId)
      .subscribe(
        (countryLanguages) => (this.countryLanguages = countryLanguages)
      );
  }
}
