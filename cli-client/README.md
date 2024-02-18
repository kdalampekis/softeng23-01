# Ntuaflix CLI

Ntuaflix CLI is a command-line tool developed specifically for the Ntuaflix project. It leverages the Ink library of Node.js to provide an interactive interface for interacting with the backend server. This CLI tool complements the functionality of the frontend UI by offering features that are not easily achievable through the graphical interface.

## Installation

To install Ntuaflix CLI, follow these steps:

1. Ensure you have Node.js installed on your system.
2. Ensure you are in the correct directory where ntuaflix-cli is located.
3. Install Ntuaflix CLI locally using npm:


```bash

npm install 

npm run build 
npm link
```

4. Be aware that if you are using Unix operating system instead of Windows you will also need to :

```bash
chmod +x dist/cli.js
```

5. Keep in mind that in order this to work you have to be at the ntuaflix-cli directory.

## Usage

Ntuaflix CLI allows you to perform various tasks related to the Ntuaflix project directly from the command line. Here are some common commands and options:

```bash
se2301 <command> [options]
```

- `<command>`: Specify the action you want to perform.
- `[options]`: Additional options to customize the command.

### Commands
- `login`: Allows users to log in to their account.
- `logout`: Logs out the current user if they are already logged in.
- `adduser`: Adds a new user to the system only with administrative privileges.
- `user`: Retrieves information about a specific user or lists all users only with administrative privileges.
- `healthcheck`: Performs a health check on the backend server only with administrative privileges.
- `resetall`: Resets all data in the backend server to its initial state only with administrative privileges.
- `newtitles`: Uploads new title information to the backend server only with administrative privileges.
- `newakas`: Uploads new alternate title information to the backend server only with administrative privileges.
- `newnames`: Uploads new names information to the backend server only with administrative privileges.
- `newcrew`: Uploads new crew information to the backend server only with administrative privileges.
- `newepisode`: Uploads new episode information to the backend server only with administrative privileges.
- `newprincipals`: Uploads new principals information to the backend server only with administrative privileges.
- `newratings`: Uploads new ratings information to the backend server only with administrative privileges.
- `title`: Retrieves information about a specific title.
- `searchtitle`: Searches for titles based on specified criteria.
- `bygenre`: Retrieves titles filtered by genre.
- `name`: Retrieves information about a specific name (person).
- `searchname`: Searches for names (people) based on specified criteria.

### Options

- `--help`
- `--username` <your_username> `--password` <your_password> (`--format` <json/csv>)
- (`--format` <json/csv>)
- `--username` <new_username> `--password` <new_password> (`--format` <json/csv>)
- `--username` <username_to_check> (`--format` <json/csv>)
- (`--format` <json/csv>)
- (`--format` <json/csv>)
- `--filename` <titles_filename> (`--format` <json/csv>)
- `--filename` <titles_filename> (`--format` <json/csv>)
- `--filename` <titles_filename> (`--format` <json/csv>)
- `--filename` <titles_filename> (`--format` <json/csv>)
- `--filename` <titles_filename> (`--format` <json/csv>)
- `--filename` <titles_filename> (`--format` <json/csv>)
- `--filename` <titles_filename> (`--format` <json/csv>)
- `--titleID` <title_ID> (`--format` <json/csv>)
- `--titlepart` <title_part> (`--format` <json/csv>)
- `--genre` <genre> `--min` <min_rating> (`--from` <from_year>) (`--to` <to_year>) (`--format` <json/csv>)
- `--nameid` <name_id> (`--format` <json/csv>)
- `--name` <searched_name> (`--format` <json/csv>)

## Features

- Interact with the backend server to perform administrative tasks.
- Automate repetitive operations through scripting.
- Access advanced functionalities not available in the frontend UI.

## Configuration

Ntuaflix CLI does not require any configuration files. However, you may need to provide authentication tokens or server endpoints as environment variables.

## Examples

Here are some examples of how to use Ntuaflix CLI:

```bash
# Command 1 example
se2301 login --username 1 --password 1
# Command 2 example
se2301 resetall
```

## Testing

For testing we are using the ava library and the test file is located at ntuaflix-cli/tests.
To run tests for Ntuaflix CLI, execute the following command:

```bash
npx ava --timeout 1000000 
```

## Troubleshooting

If you encounter any issues or errors while using Ntuaflix CLI, refer to the documentation or reach out to the project maintainers for assistance.

## Contributing

Contributions to Ntuaflix CLI are welcome! Please follow the guidelines outlined in the project repository to submit bug reports, feature requests, or pull requests.

## License

Ntuaflix CLI is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements

Ntuaflix CLI makes use of the Ink library for building the command-line interface.

## Contact

For questions, feedback, or support requests, contact the project maintainers at [konstantinosdalampekis@gmail.com].

---

Feel free to adjust the content and structure according to your specific project requirements and preferences.