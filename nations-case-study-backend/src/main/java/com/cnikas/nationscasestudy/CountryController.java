package com.cnikas.nationscasestudy;

import java.util.List;
import java.util.Optional;

import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cnikas.nationscasestudy.entities.Country;
import com.cnikas.nationscasestudy.entities.CountryLanguage;
import com.cnikas.nationscasestudy.entities.CountryStat;
import com.cnikas.nationscasestudy.entities.Region;

@RestController
@RequestMapping("/api")
@MapperScan("com.cnikas.nationscasestudy")
public class CountryController {

    private CountryMapper mapper;
    private static final Logger log = LoggerFactory.getLogger(NationscasestudyApplication.class);

    // Minimum integer in MariaDB and Java
    private static final Integer MIN_YEAR = Integer.MIN_VALUE;
    // Maximum integer in MariaDB and Java
    private static final Integer MAX_YEAR = Integer.MAX_VALUE;
    // Number of rows to fetch for each page
    private static final Integer ROWS_PER_PAGE = 10;

    public CountryController(CountryMapper mapper) {
        this.mapper = mapper;
    }

    /**
     * Fetch a list of all countries
     */
    @GetMapping("/countries")
    public List<Country> getCountryList() {
        log.info("Received GET request for /countries");
        return mapper.getCountryList();
    }

    /**
     * Fetch the country with id {countryId}
     */
    @GetMapping("/countries/{countryId}")
    public Country getCountry(@PathVariable(value = "countryId") Long countryId) {
        log.info("Received GET request for /countries/{}", countryId);
        return mapper.selectCountry(countryId);
    }

    /**
     * Fetch a list of languages spoken in country with id {countryId}
     */
    @GetMapping("/{countryId}/languages")
    public List<CountryLanguage> getCountryLanguages(@PathVariable(value = "countryId") Long countryId) {
        log.info("Received GET request for /{}/languages", countryId);
        return mapper.selectCountryLanguages(countryId);
    }

    /**
     * Fetch the stat for each country for the year with the maximum GDP to
     * population ratio
     */
    @GetMapping("/maxGdpRatio")
    public List<CountryStat> getCountryMaxGdpRatio() {
        log.info("Received GET request for /maxGdpRatio");
        return mapper.selectCountryMaxGdpRatio();
    }

    /**
     * Fetch a list filtered and paginated stats
     */
    @GetMapping("/stats")
    public List<CountryStat> getCountryStats(@RequestParam Optional<Long> regionId,
            @RequestParam Optional<Integer> fromYear,
            @RequestParam Optional<Integer> toYear,
            @RequestParam Integer page) {
        log.info("Received GET request for /stats. regionId: {}, fromYear: {}, toYear: {}, page: {}", regionId,
                fromYear, toYear, page);
        // Calculate the offset for page 
        int offset = (page - 1) * ROWS_PER_PAGE;
        // Use different mapper method if regionId is provided
        if (!regionId.isPresent()) {
            return mapper.selectCountryStatsForRegion(fromYear.orElse(MIN_YEAR), toYear.orElse(MAX_YEAR), offset,
                    ROWS_PER_PAGE + 1);
        }
        return mapper.selectCountryStats(regionId.get(), fromYear.orElse(MIN_YEAR), toYear.orElse(MAX_YEAR), offset,
                ROWS_PER_PAGE + 1);
    }

    /**
     * Fetch a list of all regions
     */
    @GetMapping("/regions")
    public List<Region> getRegions() {
        log.info("Received GET request for /regions");
        return mapper.selectAllRegions();
    }
}
