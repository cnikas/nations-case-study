package com.cnikas.nationscasestudy.entities;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Country {

    private Long countryId;
    private String name;
    private Double area;
    private Date nationalDay;
    private String countryCode2;
    private String countryCode3;
    private Region region;

}
