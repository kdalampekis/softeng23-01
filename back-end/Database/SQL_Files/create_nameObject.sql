DROP TABLE IF EXISTS nameObject;
CREATE TABLE IF NOT EXISTS nameObject AS
SELECT
    na.nconst,
    na.primaryName,
    na.imgUrl,
    na.birthYear,
    na.deathYear,
    na.primaryProfession,
	GROUP_CONCAT(COALESCE(wa.tconst, ', ') ORDER BY wa.nconst SEPARATOR ', ') AS titleID,
    GROUP_CONCAT(COALESCE(wa.category, ', ') ORDER BY wa.category SEPARATOR ', ') AS categorywr
FROM
    names na
LEFT JOIN
    workas wa ON wa.nconst = na.nconst
GROUP BY
	na.nconst;