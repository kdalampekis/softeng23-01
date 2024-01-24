LOAD DATA INFILE 'E:\\EPA\\NTUA\\ECE\\FLOWS\\FLOW_L\\Soft_Eng\\Data\\truncated_name.basics.tsv'
INTO TABLE Names
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA INFILE 'E:\\EPA\\NTUA\\ECE\\FLOWS\\FLOW_L\\Soft_Eng\\Data\\truncated_title.basics.tsv'
INTO TABLE titlebasic
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA INFILE 'E:\\EPA\\NTUA\\ECE\\FLOWS\\FLOW_L\\Soft_Eng\\Data\\truncated_title.akas.tsv'
INTO TABLE titleaka
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(tconst,
  ordering,
    title,
    region,
    language,
    types,
    attributes,
    isOriginalTitle);

LOAD DATA INFILE 'E:\\EPA\\NTUA\\ECE\\FLOWS\\FLOW_L\\Soft_Eng\\Data\\truncated_title.crew.tsv'
INTO TABLE crew
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- LOAD DATA INFILE 'E:\\EPA\\NTUA\\ECE\\FLOWS\\FLOW_L\\Soft_Eng\\Data\\truncated_series.tsv'
-- INTO TABLE series
-- FIELDS TERMINATED BY '\t'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 LINES
-- (parentTconst);

LOAD DATA INFILE 'E:\\EPA\\NTUA\\ECE\\FLOWS\\FLOW_L\\Soft_Eng\\Data\\truncated_title.episode.tsv'
INTO TABLE episode
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA INFILE 'E:\\EPA\\NTUA\\ECE\\FLOWS\\FLOW_L\\Soft_Eng\\Data\\truncated_title.principals.tsv'
INTO TABLE workas
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(tconst,
	ordering,
    nconst,
    category,
    job,
    characters,
    img_url_asset);
    
LOAD DATA INFILE 'E:\\EPA\\NTUA\\ECE\\FLOWS\\FLOW_L\\Soft_Eng\\Data\\truncated_title.principals.tsv'
INTO TABLE principals
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(tconst,
	ordering,
    nconst,
    category,
    job,
    characters,
    img_url_asset);

LOAD DATA INFILE 'E:\\EPA\\NTUA\\ECE\\FLOWS\\FLOW_L\\Soft_Eng\\Data\\truncated_title.ratings.tsv'
INTO TABLE rating
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

