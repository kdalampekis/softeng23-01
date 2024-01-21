#!/usr/bin/env node
import { render } from 'ink';
import React from 'react';
import meow from 'meow';
import App from './app.js';
import { login, logout, getTitleById, getTitleList, usser, adduser, healthcheck, resetall, newtitles, newakas, newnames, newcrew, newepisod, newprincipals, newratings, bygenre, name, searchname } from './apiClients.js';


const cli = meow(`
  Usage
    $ ntuaflix-cli
    $ se2301 login --username <your_username> --password <your_password>
    $ se2301 logout
    $ se2301 adduser --username <new_username> --password <new_password>
    $ se2301 user --username <username_to_check>
    $ se2301 healthcheck
    $ se2301 resetall
    $ se2301 newtitles --filename <titles_filename>
    $ se2301 newakas --filename <akas_filename>
    $ se2301 newnames --filename <names_filename>
    $ se2301 newcrew --filename <crew_filename>
    $ se2301 newepisode --filename <episode_filename>
    $ se2301 newprincipals --filename <principals_filename>
    $ se2301 newratings --filename <ratings_filename>
    $ se2301 title --titleID <title_ID>
    $ se2301 searchtitle --titlepart <title_part>
    $ se2301 bygenre --genre <genre> --min <min_rating> (--from <from_year>) (--to <to_year>)
    $ se2301 name --nameid <name_ID>
    $ se2301 searchname --name <searched_name>

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

  Examples

    $ ntuaflix-cli --name=Jane

    Hello, Jane

`, {

	importMeta: import.meta

});

if (cli.input[0] === 'login' && cli.flags.username && cli.flags.password) {
	login(cli.flags.username, cli.flags.password);
} else if (cli.input[0] === 'logout' && cli.flags.apikey) {
	logout(cli.flags.apikey);
}

render( /*#__PURE__*/React.createElement(App, {

	name: cli.flags.name

}));
