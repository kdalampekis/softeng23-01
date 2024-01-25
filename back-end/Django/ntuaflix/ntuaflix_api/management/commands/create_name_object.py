from django.core.management.base import BaseCommand
from django.db import connection

class Command(BaseCommand):
    help = 'Create the NameObject table with complex SQL operations'

    def handle(self, *args, **kwargs):
        with connection.cursor() as cursor:
            # Define your SQL commands
            sql_commands = [
                "DROP TABLE IF EXISTS nameObject;",
                """
                CREATE TABLE IF NOT EXISTS nameObject AS
                SELECT
                    na.nconst,
                    na.primaryName,
                    na.imgUrl,
                    na.birthYear,
                    na.deathYear,
                    na.primaryProfession,
                    GROUP_CONCAT(DISTINCT p.tconst) AS titleID,
                    GROUP_CONCAT(DISTINCT p.category) AS category
                FROM
                    names na
                LEFT JOIN
                    principals p ON p.nconst = na.nconst
                GROUP BY
                    na.nconst;
                """,
            ]

            # Execute each SQL command
            for sql in sql_commands:
                cursor.execute(sql)

            self.stdout.write(self.style.SUCCESS('Successfully created NameObject table'))
