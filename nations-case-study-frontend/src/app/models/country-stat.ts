import { Country } from "./country";

export interface CountryStat {
    country: Country;
    year: number;
    population: number;
    gdp: number;
}
