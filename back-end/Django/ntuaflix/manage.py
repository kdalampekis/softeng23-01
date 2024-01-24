#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ntuaflix.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    if 'runserver' in sys.argv and '--' not in sys.argv:
        # Find the position of the 'runserver' command
        runserver_index = sys.argv.index('runserver')
        
        # Check if a port is already specified
        if runserver_index + 1 < len(sys.argv):
            port_arg = sys.argv[runserver_index + 1]
            
            # Check if the port_arg is not another option (doesn't start with '-')
            if not port_arg.startswith('-'):
                # Port is already specified, do not append the default port
                execute_from_command_line(sys.argv)
                return
        
        # Append the default port if not already specified
        sys.argv.insert(runserver_index + 1, '9876')
    
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
