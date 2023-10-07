import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Country } from './models/country';
import { CountryLanguage } from './models/country-language';
import { CountryStat } from './models/country-stat';
import { Region } from './models/region';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  
  constructor(private http: HttpClient) {}

  /** GET list of countries */
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('/api/countries');
  }

  /** GET country */
  getCountry(countryId: number): Observable<Country> {
    return this.http.get<Country>(`/api/countries/${countryId}`);
  }

  /** GET list of languages for country */
  getLanguages(countryId: number): Observable<CountryLanguage[]> {
    return this.http.get<CountryLanguage[]>(`/api/${countryId}/languages`);
  }

  /** GET stat with maximum GDP per population of each country*/
  getCountryMaxGdpRatio(): Observable<CountryStat[]> {
    return this.http.get<CountryStat[]>('/api/maxGdpRatio');
  }

  /** GET filtered and paginated stats*/
  getCountryStats(page: number, regionId?: number, fromYear?: number, toYear?: number): Observable<CountryStat[]> {
    
    const params: any = {
      page: page
    }

    if(regionId) {
      params.regionId = regionId;
    }
    if(fromYear) {
      params.fromYear = fromYear;
    }
    if(toYear) {
      params.toYear = toYear;
    }
    let httpParams = new HttpParams();
    Object.keys(params).forEach(k => {
      httpParams = httpParams.set(k, params[k]);
    });
    return this.http.get<CountryStat[]>('/api/stats', { params: params });
  }

  /** GET list of regions*/
  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>('/api/regions');
  }
}
