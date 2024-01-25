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
                CREATE TABLE titleObjectpart1 AS
                SELECT
                    tb.tconst,
                    tb.titleType
                FROM
                    titlebasic tb
                JOIN
                    titleaka ta ON tb.tconst = ta.tconst
                GROUP BY
                    tb.tconst, tb.titleType;
                """,
            ]

            # Execute each SQL command
            for sql in sql_commands:
                cursor.execute(sql)

            self.stdout.write(self.style.SUCCESS('Successfully created titleObject table'))
