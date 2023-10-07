package com.cnikas.nationscasestudy;

import java.util.List;

import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import com.cnikas.nationscasestudy.entities.Continent;
import com.cnikas.nationscasestudy.entities.Country;
import com.cnikas.nationscasestudy.entities.CountryLanguage;
import com.cnikas.nationscasestudy.entities.CountryStat;
import com.cnikas.nationscasestudy.entities.Language;
import com.cnikas.nationscasestudy.entities.Region;

public interface CountryMapper {

    @Select("SELECT country_id, name, area, country_code2 FROM COUNTRIES ORDER BY name")
    List<Country> getCountryList();

    @Results({
            @Result(property = "region", column = "region_id", one = @One(select = "selectRegion")),
    })
    @Select("SELECT * FROM countries WHERE country_id = #{countryId}")
    Country selectCountry(@Param("countryId") Long countryId);

    @Results({
            @Result(property = "continent", column = "continent_id", one = @One(select = "selectContinent")),
    })
    @Select("SELECT * FROM regions WHERE region_id = #{regionId}")
    Region selectRegion(@Param("regionId") Long regionId);

    @Select("SELECT * FROM continents WHERE continent_id = #{continentId}")
    Continent selectContinent(@Param("continentId") Long continentId);

    @Select("select * FROM LANGUAGES WHERE language_id = #{languageId}")
    Language selectLanguage(@Param("languageId") Long languageId);

    @Results({
            @Result(property = "country", column = "country_id", one = @One(select = "selectCountry")),
            @Result(property = "official", column = "official"),
            @Result(property = "language", column = "language_id", one = @One(select = "selectLanguage"))
    })
    @Select("SELECT country_id, official, language_id FROM country_languages WHERE country_id = #{countryId}")
    List<CountryLanguage> selectCountryLanguages(@Param("countryId") Long countryId);

    @Results({
            @Result(property = "country", column = "country_id", one = @One(select = "selectCountry")),
            @Result(property = "year", column = "year"),
            @Result(property = "population", column = "population"),
            @Result(property = "gdp", column = "gdp"),
            @Result(property = "gdpPerPopulation", column = "gdp_per_population"),
    })
    @Select("SELECT country_stats.country_id as country_id, year, population, gdp, max(gdp/population) as gdp_per_population "
            +
            "from country_stats " +
            "join countries on country_stats.country_id = countries.country_id " +
            "group by countries.country_id ")
    List<CountryStat> selectCountryMaxGdpRatio();

    @Results({
            @Result(property = "country", column = "country_id", one = @One(select = "selectCountry"))
    })
    @Select("SELECT * " +
            "FROM country_stats " +
            "JOIN countries on country_stats.country_id = countries.country_id " +
            "WHERE countries.region_id = #{regionId} " +
            "AND year >= ${fromYear} AND year <= ${toYear} " +
            "ORDER BY year " +
            "LIMIT ${offset}, ${rows}")
    List<CountryStat> selectCountryStats(@Param("regionId") Long regionId, @Param("fromYear") int fromYear,
            @Param("toYear") int toYear, @Param("offset") Integer offset, @Param("rows") Integer rows);

    @Results({
            @Result(property = "country", column = "country_id", one = @One(select = "selectCountry"))
    })
    @Select("SELECT * " +
            "FROM country_stats " +
            "JOIN countries on country_stats.country_id = countries.country_id " +
            "WHERE year >= ${fromYear} AND year <= ${toYear} " +
            "ORDER BY year " +
            "LIMIT ${offset}, ${rows}")
    List<CountryStat> selectCountryStatsForRegion(@Param("fromYear") Integer fromYear,
            @Param("toYear") Integer toYear, @Param("offset") Integer offset, @Param("rows") Integer rows);

    @Select("SELECT * FROM regions")
    List<Region> selectAllRegions();
}