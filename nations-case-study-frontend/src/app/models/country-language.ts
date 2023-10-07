import { Country } from "./country";
import { Language } from "./language";

export interface CountryLanguage {
  country: Country;
  language: Language;
  official: boolean;
}
