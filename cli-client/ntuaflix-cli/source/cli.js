#!/usr/bin/env node
import { render } from 'ink';
import React from 'react';
import meow from 'meow';
import App from './app.js';
import { login, logout, adduser, user, healthcheck, resetall, newtitles, newakas, newnames, newcrew, newepisode, newprincipals, newratings, title, searchtitle, bygenre, name, searchname } from './apiClient.js';


const cli = meow(`
  Usage
    $ se2301
    $ se2301 login --username <your_username> --password <your_password> (--format <json/csv>)
    $ se2301 logout (--format <json/csv>)
    $ se2301 adduser --username <new_username> --password <new_password> (--format <json/csv>)
    $ se2301 user --username <username_to_check> (--format <json/csv>)
    $ se2301 healthcheck (--format <json/csv>)
    $ se2301 resetall (--format <json/csv>)
    $ se2301 newtitles --filename <titles_filename> (--format <json/csv>)
    $ se2301 newakas --filename <akas_filename> (--format <json/csv>)
    $ se2301 newnames --filename <names_filename> (--format <json/csv>)
    $ se2301 newcrew --filename <crew_filename> (--format <json/csv>)
    $ se2301 newepisode --filename <episode_filename> (--format <json/csv>)
    $ se2301 newprincipals --filename <principals_filename> (--format <json/csv>)
    $ se2301 newratings --filename <ratings_filename> (--format <json/csv>)
    $ se2301 title --titleID <title_ID> (--format <json/csv>)
    $ se2301 searchtitle --titlepart <title_part> (--format <json/csv>)
    $ se2301 bygenre --genre <genre> --min <min_rating> (--from <from_year>) (--to <to_year>) (--format <json/csv>)
    $ se2301 name --nameid <name_id> (--format <json/csv>)
    $ se2301 searchname --name <searched_name> (--format <json/csv>)

  Options
    --name       Your name
    --username   Username for authentication
    --password   Password for authentication
    --filename   Filename for data upload
    --titleID    ID of the title
    --titlepart  Partial title for search
    --genre      Genre for search
    --min        Minimum rating
    --from       Starting year (optional for date range)
    --to         Ending year (optional for date range)
    --nameid     ID of the name
    --format     Output format (json/csv, default: json)


  Examples

    $ se2301 --name=Jane

    Hello, Jane

`, {

	importMeta: import.meta,
	flags: {
		format: {
			type: 'string',
			default: 'json',
		},
		username: {
			type: 'string',
		},
		password: {
			type: 'string',
		},
		apikey: {
			type: 'string',
		},
		filename: {
			type: 'string',
		},
		titleID: {
			type: 'string',
		},
		titlepart: {
			type: 'string',
		},
		genre: {
			type: 'string',
		},
		min: {
			type: 'string',
		},
		from: {
			type: 'string',
		},
		to: {
			type: 'string',
		},
		nameid: {
			type: 'string',
		},
		name: {
			type: 'string',
		},
	}
});

async function executeCommand() {
	const format = cli.flags.format;
	const command = cli.input[0];

	switch (command) {
		case 'login':
			if (!cli.flags.username || !cli.flags.password) {
				console.error('Username and password are required for login.');
				return;
			}
			await login(cli.flags.username, cli.flags.password, format);
			break;

		case 'logout':
			await logout(cli.flags.apikey, format);
			break;

		case 'adduser':
			await adduser(cli.flags.username, cli.flags.password, format);
			break;

		case 'user':
			await user(cli.flags.username, format);
			break;

		case 'healthcheck':
			await healthcheck(format);
			break;

		case 'resetall':
			await resetall(format);
			break;

		case 'newtitles':
			await newtitles(cli.flags.filename, format);
			break;

		case 'newakas':
			await newakas(cli.flags.filename, format);
			break;

		case 'newnames':
			await newnames(cli.flags.filename, format);
			break;

		case 'newcrew':
			await newcrew(cli.flags.filename, format);
			break;

		case 'newepisode':
			await newepisode(cli.flags.filename, format);
			break;

		case 'newprincipals':
			await newprincipals(cli.flags.filename, format);
			break;

		case 'newratings':
			await newratings(cli.flags.filename, format);
			break;

		case 'title':
			await title(cli.flags.titleId, format);
			break;

		case 'searchtitle':
			await searchtitle(cli.flags.titlepart, format);
			break;

		case 'bygenre':
			await bygenre(cli.flags.genre, cli.flags.min, cli.flags.from, cli.flags.to, format);
			break;

		case 'name':
			await name(cli.flags.nameid, format);
			break;

		case 'searchname':
			await searchname(cli.flags.name, format);
			break;

		default:
			console.log('Invalid command. Available commands:se2301 login, se2301 logout, se2301 adduser, se2301 user, se2301 healthcheck, se2301 resetall, se2301 newtitles, se2301 newakas, se2301 newnames, se2301 newcrew, se2301 newepisode, se2301 newprincipals, se2301 newratings, se2301 title, se2301 searchtitle, se2301 bygenre, se2301 name, se2301 searchname');
	}
}

executeCommand();
render( /*#__PURE__*/React.createElement(App, {
	name: cli.flags.name
}));
