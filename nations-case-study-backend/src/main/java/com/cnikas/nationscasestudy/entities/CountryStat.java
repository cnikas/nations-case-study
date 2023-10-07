package com.cnikas.nationscasestudy.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CountryStat {

    private Country country;
    private int year;
    private int population;
    private Double gdp;
    private Double gdpPerPopulation;

}