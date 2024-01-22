SELECT 
    tb.tconst,
    tb.primaryTitle,
    tb.startYear
FROM 
    TitleBasic tb
WHERE 
    tb.tconst IN (
        SELECT 
            SUBSTRING_INDEX(SUBSTRING_INDEX(nb.KnownForTitles, ',', numbers.n), ',', -1) 
        FROM 
            (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) numbers
        INNER JOIN 
            Names nb ON CHAR_LENGTH(nb.KnownForTitles) - CHAR_LENGTH(REPLACE(nb.KnownForTitles, ',', '')) >= numbers.n - 1
        WHERE 
            nb.primaryName = 'Al Pacino'
    )
;
