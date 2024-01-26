from django.core.management.base import BaseCommand
from django.db import connection

class Command(BaseCommand):
    help = 'Create the titleObject table with complex SQL operations'

    def handle(self, *args, **kwargs):
        with connection.cursor() as cursor:
            # Define your SQL commands
            sql_commands = [
                "DROP TABLE IF EXISTS titleObjectpart1;",

                """
                CREATE TABLE IF NOT EXISTS titleObjectpart1 AS
                SELECT
                    tb.tconst,
                    tb.titleType,
                    tb.originalTitle,
                    tb.img_url_asset,
                    tb.startYear,
                    tb.endYear,
                    tb.genres,
                    GROUP_CONCAT(COALESCE(ta.title, ', ')) AS titles,
                    GROUP_CONCAT(IFNULL(ta.region, ' '), ', ') AS regions
                FROM
                    titlebasic tb
                JOIN
                    titleaka ta ON tb.tconst = ta.tconst
                GROUP BY
                    tb.tconst, tb.titleType, tb.originalTitle, tb.img_url_asset, tb.startYear, tb.endYear;



                """,

                "SELECT * FROM titleObjectpart1;",



                "DROP TABLE IF EXISTS titleObjectWithRatings;",



                """
                CREATE TABLE IF NOT EXISTS titleObjectWithRatings AS
                SELECT
                    tobject1.*,
                    rating.averageRating,
                    rating.numVotes
                FROM
                    titleObjectpart1 tobject1
                JOIN
                    rating ON tobject1.tconst = rating.tconst;
                """,




                "DROP TABLE IF EXISTS principals_names;",



                """

                CREATE TABLE IF NOT EXISTS principals_names AS
                SELECT
                    p.tconst,
                    GROUP_CONCAT(DISTINCT COALESCE(n.primaryName, ', ')) AS primaryName,
                    GROUP_CONCAT(DISTINCT COALESCE(p.nconst, ', ')) AS nconsts,
                    GROUP_CONCAT(DISTINCT COALESCE(p.category, ', ')) AS categories
                FROM
                    principals p
                LEFT JOIN
                    names n ON p.nconst = n.nconst
                GROUP BY
                    p.tconst;

                """,


                

                "DROP TABLE IF EXISTS titleObject;",

                """
                CREATE TABLE IF NOT EXISTS titleObject AS
                SELECT
                    tor.*,
                    pn.nconsts,
                    pn.categories,
                    pn.primaryName
                FROM
                    titleObjectWithRatings tor
                JOIN
                    principals_names pn ON tor.tconst = pn.tconst;
                """,
            ]

            # Execute each SQL command
            for sql in sql_commands:
                cursor.execute(sql)

            self.stdout.write(self.style.SUCCESS('Successfully created titleObject table'))
