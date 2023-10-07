package com.cnikas.nationscasestudy.entities;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Continent {

    private Long continentId;
    private String name;
    private List<Region> regions;
}
