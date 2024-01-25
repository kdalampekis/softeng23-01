from django.core.management.base import BaseCommand
from django.db import connection



class Command(BaseCommand):
    help = 'Create the nameProfile table with complex SQL operations'

    def handle(self, *args, **kwargs):
        with connection.cursor() as cursor:
            # Define your SQL commands
            sql_commands = [
                "DROP TABLE IF EXISTS nameProfile;",
                """
                CREATE TABLE nameProfile AS
                SELECT 
                    n.primaryName AS ActorName,
                    p.nconst AS ActorNconst,
                    GROUP_CONCAT(DISTINCT tb.genres) AS AllGenres
                FROM names n
                JOIN principals p ON n.nconst = p.nconst
                JOIN titlebasic tb ON p.tconst = tb.tconst
                GROUP BY n.primaryName, p.nconst;
                """,
            ]

            # Execute each SQL command
            for sql in sql_commands:
                cursor.execute(sql)

            self.stdout.write(self.style.SUCCESS('Successfully created nameProfile table'))
