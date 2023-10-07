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
  showError: boolean = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.getRegions();
    this.getStats();
  }

  getRegions(): void {
    this.countryService
      .getRegions()
      .subscribe((regions) => (this.regions = regions));
  }

  getStats(): void {
    this.countryService
      .getCountryStats(this.page, this.regionId, this.fromYear, this.toYear)
      .subscribe((stats) => {
        this.stats = stats;
        this.updateButtonStatus();
      });
  }

  filter(regionId?: string, fromYear?: string, toYear?: string): void {
    this.page = 1;
    // Reset error message;
    this.showError=false;
    // If filtering attributes are present, update them
    this.fromYear = this.validateYear(fromYear);
    this.toYear = this.validateYear(toYear);
    this.regionId = this.validateYear(regionId);
    // Fetch stats
    if (!this.showError) this.getStats();
  }

  // Triggered when user moves to the next page
  nextPage(): void {
    this.page++;
    this.getStats();
  }

  // Triggered when user moves to the previous page
  previousPage(): void {
    this.page--;
    this.getStats();
  }

  // Triggered when new data is fetched to enable or disable buttons
  updateButtonStatus(): void {
    this.previousDisabled = this.page <= 1;
    this.nextDisabled = this.stats.length <= 10;
  }

  // Valid years are undefined, the empty string, or an integer
  validateYear(year?: string) :number | undefined {
    if (year == undefined || year == '') return undefined
    if(/^-?\d+$/.test(year)) return Number(year);
    this.showError = true;
    return undefined;
  }
}
