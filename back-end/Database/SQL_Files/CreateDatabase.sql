DROP DATABASE IF EXISTS soft_eng_2023;
CREATE DATABASE soft_eng_2023;
USE soft_eng_2023;


CREATE TABLE Names (
    nconst varchar(10) NOT NULL,
    primaryName varchar(255),
    birthYear int(10),
    deathYear int(10),
    primaryProfession varchar(255),
    knownForTitles varchar(255),
    imgUrl varchar(255),
    PRIMARY KEY (nconst)
);

CREATE TABLE TitleAka (
	aka_Id int NOT NULL AUTO_INCREMENT,
    tconst varchar(10) NOT NULL,
    ordering int(10),
    title varchar(255),
    region varchar(255),
    language varchar(255),
    types varchar(255),
    attributes varchar(255),
    isOriginalTitle int(5),
    PRIMARY KEY (aka_Id)
);

CREATE TABLE TitleBasic (
    tconst varchar(10) NOT NULL,
    titleType varchar(255),
    primaryTitle varchar(255),
    originalTitle varchar(255),
    isAdult int(5),
    startYear year,
    endYear year,
    runtimeMinutes int,
    genres varchar(255),
    img_url_asset varchar(255),
    PRIMARY KEY (tconst)
);

CREATE TABLE Crew (
    tconst varchar(10) NOT NULL,
    directors varchar(255),
    writers varchar(255),
    PRIMARY KEY (tconst)
);

CREATE TABLE Episode (
    tconst varchar(10) NOT NULL,
    parentTconst varchar(11) NOT NULL,
    seasonNumber int(10),
    episodeNumber int(10),
    PRIMARY KEY (tconst, parentTconst)
);

CREATE TABLE WorkAs (
	workas_Id int NOT NULL AUTO_INCREMENT,
    tconst varchar(10) NOT NULL,
    ordering int(10),
    nconst varchar(10) NOT NULL,
    category varchar(25),
    job varchar(255),
    characters varchar(255),
    img_url_asset varchar(255),
    PRIMARY KEY (workas_Id)
);

CREATE TABLE User (
    userId int(10) NOT NULL AUTO_INCREMENT,
    username varchar(255),
    passwordHash varchar(255),
    email varchar(255),
    dateOfBirth date,
    country varchar(255),
    gender int(3),
    PRIMARY KEY (userId)
);

CREATE TABLE Rating (
    tconst varchar(10) NOT NULL,
    averageRating float,
    numVotes int(10),
    PRIMARY KEY (tconst)
);

-- CREATE TABLE Series (
--     parentTconst varchar(11) NOT NULL,
--     title varchar(50),
--     originalTitle varchar(50),
--     PRIMARY KEY (parentTconst)
-- );

CREATE TABLE Genres (
    genreId int(10) NOT NULL AUTO_INCREMENT,
    genreName varchar(10),
    PRIMARY KEY (genreId)
);

CREATE TABLE Title_Genres (
    tconst varchar(10) NOT NULL,
    genreId int(10) NOT NULL,
    PRIMARY KEY (tconst, genreId)
);

CREATE TABLE User_Like (
    tconst varchar(10) NOT NULL,
    userId int(10) NOT NULL,
    Liked bit(1),
    PRIMARY KEY (tconst, userId)
);

ALTER TABLE TitleAka ADD CONSTRAINT FK_TitleAka_TitleBasic FOREIGN KEY (tconst) REFERENCES TitleBasic (tconst);

ALTER TABLE Crew ADD CONSTRAINT FK_Crew_TitleBasic FOREIGN KEY (tconst) REFERENCES TitleBasic (tconst);

ALTER TABLE WorkAs ADD CONSTRAINT FK_WorkAs_TitleBasic FOREIGN KEY (tconst) REFERENCES TitleBasic (tconst);

-- ALTER TABLE Episode ADD CONSTRAINT FK_Episode_Series FOREIGN KEY (parentTconst) REFERENCES Series (parentTconst);

ALTER TABLE Title_Genres ADD CONSTRAINT FK_TitleGenres_TitleBasic FOREIGN KEY (tconst) REFERENCES TitleBasic (tconst);

ALTER TABLE Title_Genres ADD CONSTRAINT FK_TitleGenres_Genres FOREIGN KEY (genreId) REFERENCES Genres (genreId);

ALTER TABLE User_Like ADD CONSTRAINT FK_UserLike_User FOREIGN KEY (userId) REFERENCES User (userId);

ALTER TABLE User_Like ADD CONSTRAINT FK_UserLike_TitleBasic FOREIGN KEY (tconst) REFERENCES TitleBasic (tconst);

ALTER TABLE Rating ADD CONSTRAINT FK_Rating_TitleBasic FOREIGN KEY (tconst) REFERENCES TitleBasic (tconst);

ALTER TABLE Episode ADD CONSTRAINT FK_Episode_TitleBasic FOREIGN KEY (tconst) REFERENCES TitleBasic (tconst);

ALTER TABLE WorkAs ADD CONSTRAINT FK_WorkAs_Names FOREIGN KEY (nconst) REFERENCES Names (nconst);
