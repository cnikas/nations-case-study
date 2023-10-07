import { Component, SimpleChanges } from '@angular/core';
import { CountryStat } from '../models/country-stat';
import { CountryService } from '../country.service';
import { Region } from '../models/region';

@Component({
  selector: 'app-stats-table',
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.css'],
})
export class StatsTableComponent {
  regions: Region[] = [];
  stats: CountryStat[] = [];
  page: number = 1;
  regionId?: number;
  fromYear?: number;
  toYear?: number;
  previousDisabled: boolean = true;
  nextDisabled: boolean = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.getRegions();
    this.getCountries();
  }

  getRegions(): void {
    this.countryService
      .getRegions()
      .subscribe((regions) => (this.regions = regions));
  }

  getCountries(): void {
    this.countryService
      .getCountryStats(this.page, this.regionId, this.fromYear, this.toYear)
      .subscribe((stats) => {
        this.stats = stats;
        this.updateButtonStatus();
      });
  }

  filter(regionId?: string, fromYear?: string, toYear?: string): void {
    this.page = 1;
    // If filtering attributes are present, update them
    if (fromYear || fromYear == '') {
      this.fromYear = parseInt(fromYear) || undefined;
    }
    if (toYear || toYear == '') {
      this.toYear = parseInt(toYear) || undefined;
    }
    if (regionId || regionId == '') {
      this.regionId = parseInt(regionId) || undefined;
    }
    this.getCountries();
  }

  // Triggered when user moves to the next page
  nextPage(): void {
    this.page++;
    this.getCountries();
  }

  // Triggered when user moves to the previous page
  previousPage(): void {
    this.page--;
    this.getCountries();
  }

  // Triggered when new data is fetched to enable or disable buttons
  updateButtonStatus(): void {
    this.previousDisabled = this.page <= 1;
    this.nextDisabled = this.stats.length <= 10;
  }
}
