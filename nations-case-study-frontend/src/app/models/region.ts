import { Continent } from "./continent";

export interface Region {
  regionId: number;
  name: string;
  continent: Continent;
}
