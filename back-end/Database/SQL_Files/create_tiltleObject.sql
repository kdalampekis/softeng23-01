DROP TABLE IF EXISTS titleObjectpart1;
CREATE TABLE IF NOT EXISTS titleObjectpart1 AS
SELECT
    tb.tconst,
    tb.titleType,
    tb.originalTitle,
    tb.img_url_asset,
    tb.startYear,
    tb.endYear,
    tb.genres,
    GROUP_CONCAT(ta.title ORDER BY ta.aka_Id SEPARATOR ', ') AS titles,
    GROUP_CONCAT(IF(ta.region IS NULL, ' ', ta.region) ORDER BY ta.aka_Id SEPARATOR ', ') AS regions
FROM
    titlebasic tb
JOIN
    titleaka ta ON tb.tconst = ta.tconst
GROUP BY
    tb.tconst, tb.titleType, tb.originalTitle, tb.img_url_asset, tb.startYear, tb.endYear;


-- LEFT JOIN
--     workas wa ON tb.tconst = wa.tconst
-- 	GROUP_CONCAT(DISTINCT wa.nconst ORDER BY wa.nconst SEPARATOR ', ') AS nconsts
--     GROUP_CONCAT(wa.category ORDER BY wa.nconst SEPARATOR ', ') AS category
-- 	GROUP_CONCAT(nm.primaryName ORDER BY wa.nconst SEPARATOR ', ') AS primaryNames


DROP TABLE IF EXISTS titleObjectWithRatings;
CREATE TABLE IF NOT EXISTS titleObjectWithRatings AS
SELECT
    tobject1.*,
    rating.averageRating,
    rating.numVotes
FROM
    titleObjectpart1 tobject1
JOIN
    rating ON tobject1.tconst = rating.tconst;
 
 
 
DROP TABLE IF EXISTS workas_names;
CREATE TABLE IF NOT EXISTS workas_names AS
SELECT
    w.tconst,
	GROUP_CONCAT(COALESCE(n.primaryName, ', ') ORDER BY n.primaryName SEPARATOR ', ') AS primaryName,
    GROUP_CONCAT(COALESCE(w.nconst, ', ') ORDER BY w.nconst SEPARATOR ', ') AS nconsts,
    GROUP_CONCAT(COALESCE(w.category, ', ') ORDER BY w.category SEPARATOR ', ') AS categories
FROM
    workas w
LEFT JOIN
    names n ON w.nconst = n.nconst
GROUP BY
    w.tconst;




DROP TABLE IF EXISTS titleObject;
CREATE TABLE IF NOT EXISTS titleObject AS
SELECT
    tor.*,
    wan.nconsts,
    wan.categories,
    wan.primaryName
FROM
    titleObjectWithRatings tor
JOIN
    workas_names wan ON tor.tconst = wan.tconst;


DROP TABLE IF EXISTS titleObjectpart1;
DROP TABLE IF EXISTS titleObjectWithRatings;
DROP TABLE IF EXISTS workas_names;




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
    
    
DROP TABLE IF EXISTS nameProfile;
CREATE TABLE IF NOT EXISTS nameProfile
SELECT n.primaryName AS ActorName,
       p.nconst AS ActorNconst,
       GROUP_CONCAT(DISTINCT tb.genres) AS AllGenres
FROM names n
JOIN principals p ON n.nconst = p.nconst
JOIN titlebasic tb ON p.tconst = tb.tconst
-- WHERE n.primaryName LIKE '%%'
GROUP BY n.primaryName, p.nconst;

select * from nameProfile


	
