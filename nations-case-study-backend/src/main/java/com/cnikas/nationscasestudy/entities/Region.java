package com.cnikas.nationscasestudy.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Region {

    private Long regionId;
    private String name;
    private Continent continent;
}
