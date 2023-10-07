import { Region } from "./region";

export interface Country {
  countryId: number;
  name: string;
  area: number;
  nationalDay: string;
  countryCode2: string;
  countryCode3: string;
  region: Region;
}
