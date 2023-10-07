package com.cnikas.nationscasestudy.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CountryLanguage {

    private Country country;
    private Language language;
    private boolean official;
}
