import test from 'ava';
import { exec } from 'child_process';

// Helper function to execute a CLI command and return a Promise
const executeCommand = (command) => {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(stderr);
			} else {
				resolve(stdout);
			}
		});
	});
};

//test when the user exists
test.serial('CLI - login command success', async (t) => {
	const result = await executeCommand('se2301 login --username 1 --password 1');
	t.true(result.includes('Login successful'));
});

//test when the user doesn't exist
test.serial('CLI - login command failure', async (t) => {
	const result = await executeCommand('se2301 login --username nonexistant --password nonexistant');
	t.false(result.includes('Error: Authentication failed'));
});

//add a signed up user as an administrator
test.serial('CLI - adduser command success', async (t) => {
	const result = await executeCommand('se2301 adduser --username sere --password sere');
	t.true(result.includes('User added successfully'));
});


//fail to add a user who hasn't signed up yet
test.serial('CLI - adduser command failure', async (t) => {
	const result = await executeCommand('se2301 adduser --username nonexistant --password nonexistant');
	t.false(result.includes('Error: Failed to add user'));
});

//fail to add a signed up user as an ordinary user and not administrator
test.serial('CLI - adduser command forbidden as user', async (t) => {
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username sere --password sere');
	const result = await executeCommand('se2301 adduser --username kostas --password kostas');
	t.false(result.includes('Error: Failed to add user'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - adduser command forbidden as not logged in', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 adduser --username kostas --password kostas');
	t.true(result.includes('Login required'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

//success as an administrator with the default format
test.serial('CLI - user command success', async (t) => {
	const result = await executeCommand('se2301 user --username sere');
	t.true(result.includes('username: \'sere\',\n' +
		'  email: \'g.seretakos@gmail.com\',\n' +
		'  first_name: \'George\',\n' +
		'  last_name: \'Seretakos\''));
});

//success as an administrator with scv format
test.serial('CLI - user command success csv', async (t) => {
	const result = await executeCommand('se2301 user --username sere --format csv');
	t.true(result.includes('email,first_name,last_name,username\n' +
		'g.seretakos@gmail.com,George,Seretakos,sere\n'));
});

//success as an administrator with json format
test.serial('CLI - user command success json', async (t) => {
	const result = await executeCommand('se2301 user --username sere --format json');
	t.true(result.includes('username: \'sere\',\n' +
		'  email: \'g.seretakos@gmail.com\',\n' +
		'  first_name: \'George\',\n' +
		'  last_name: \'Seretakos\''));
});

//fail because of a non existing user
test.serial('CLI - user command failure ', async (t) => {
	const result = await executeCommand('se2301 user --username nonexistant');
	t.false(result.includes('Error: User not found'));
});

test.serial('CLI - user command forbidden as user', async (t) => {
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username sere --password sere');
	const result = await executeCommand('se2301 user --username kostas');
	t.false(result.includes('Error: User not found'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - user command forbidden as not logged in', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 adduser --username kostas');
	t.true(result.includes('Login required'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

//success as an administrator
test.serial('CLI - healthcheck command success', async (t) => {
	const result = await executeCommand('se2301 healthcheck');
	t.true(result.includes('Health check passed'));
});

// fail the administrator authentication
test.serial('CLI - healthcheck command forbidden as a user', async (t) => {
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username sere --password sere');
	const result = await executeCommand('se2301 healthcheck');
	t.false(result.includes('Error: Health check failed'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - healthcheck command forbidden as not logged in', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 healthcheck');
	t.true(result.includes('Login required'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

//test as an administrator
test.serial('CLI - resetall command success', async (t) => {
	const result = await executeCommand('se2301 resetall');
	t.true(result.includes('Reset all successful'));
});

//fail to authenticate as an administrator
test.serial('CLI - resetall command forbidden as a user', async (t) => {
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username sere --password sere');
	const result = await executeCommand('se2301 resetall');
	t.false(result.includes('Error: Failed to reset all'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - resetall command forbidden as not logged in', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 resetall');
	t.true(result.includes('Login required'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newtitles command success', async (t) => {
	const result = await executeCommand('se2301 newtitles --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.basics.tsv');
	t.true(result.includes('API call successful'));
});

test.serial('CLI - newtitles command failure', async (t) => {
	const result = await executeCommand('se2301 newtitles --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.basicss.tsv');
	t.false(result.includes('Error: API call failed'));
});

test.serial('CLI - newtitles command forbidden as a user', async (t) => {
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username sere --password sere');
	const result = await executeCommand('se2301 newtitles --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.basics.tsv');
	t.false(result.includes('Error: API call failed'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newtitles command forbidden as not logged in', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 newtitles --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.basics.tsv');
	t.true(result.includes('Login required'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newnames command success', async (t) => {
	const result = await executeCommand('se2301 newnames --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_name.basics.tsv');
	t.true(result.includes('API call successful'));
});

test.serial('CLI - newnames command failure', async (t) => {
	const result = await executeCommand('se2301 newnames --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_name.basicss.tsv');
	t.false(result.includes('Error: API call failed'));
});

test.serial('CLI - newnames command forbidden as a user', async (t) => {
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username sere --password sere');
	const result = await executeCommand('se2301 newnames --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_name.basics.tsv');
	t.false(result.includes('Error: API call failed'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newnames command forbidden as not logged in', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 newnames --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_name.basics.tsv');
	t.true(result.includes('Login required'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newakas command success', async (t) => {
	const result = await executeCommand('se2301 newakas --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.akas.tsv');
	t.true(result.includes('API call successful'));
});

test.serial('CLI - newakas command failure', async (t) => {
	const result = await executeCommand('se2301 newakas --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.aka.tsv');
	t.false(result.includes('Error: API call failed'));
});

test.serial('CLI - newakas command forbidden as a user', async (t) => {
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username sere --password sere');
	const result = await executeCommand('se2301 newakas --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.akas.tsv');
	t.false(result.includes('Error: API call failed'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newakas command forbidden as not logged in', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 newakas --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.akas.tsv');
	t.true(result.includes('Login required'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newcrew command success', async (t) => {
	const result = await executeCommand('se2301 newcrew --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.crew.tsv');
	t.true(result.includes('API call successful'));
});

test.serial('CLI - newcrew command failure', async (t) => {
	const result = await executeCommand('se2301 newcrew --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.crews.tsv');
	t.false(result.includes('Error: API call failed'));
});

test.serial('CLI - newcrew command forbidden as a user', async (t) => {
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username sere --password sere');
	const result = await executeCommand('se2301 newcrew --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.crew.tsv');
	t.false(result.includes('Error: API call failed'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newcrew command forbidden as logged in', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 newcrew --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.crew.tsv');
	t.true(result.includes('Login required'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newepisode command success', async (t) => {
	const result = await executeCommand('se2301 newepisode --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.episode.tsv');
	t.true(result.includes('API call successful'));
});

test.serial('CLI - newepisode command failure', async (t) => {
	const result = await executeCommand('se2301 newepisode --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.episodes.tsv');
	t.false(result.includes('Error: API call failed'));
});

test.serial('CLI - newepisode command forbidden as a user', async (t) => {
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username sere --password sere');
	const result = await executeCommand('se2301 newepisode --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.episode.tsv');
	t.false(result.includes('Error: API call failed'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newepisode command forbidden as logged in', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 newepisode --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.episode.tsv');
	t.true(result.includes('Login required'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newprincipals command success', async (t) => {
	const result = await executeCommand('se2301 newprincipals --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.principals.tsv');
	t.true(result.includes('API call successful'));
});

test.serial('CLI - newprincipals command failure', async (t) => {
	const result = await executeCommand('se2301 newprincipals --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.principal.tsv');
	t.false(result.includes('Error: API call failed'));
});

test.serial('CLI - newprincipals command forbidden as a user', async (t) => {
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username sere --password sere');
	const result = await executeCommand('se2301 newprincipals --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.principals.tsv');
	t.false(result.includes('Error: API call failed'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newprincipals command forbidden as logged in', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 newprincipals --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.principals.tsv');
	t.true(result.includes('Login required'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newratings command success', async (t) => {
	const result = await executeCommand('se2301 newratings --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.ratings.tsv');
	t.true(result.includes('API call successful'));
});

test.serial('CLI - newratings command failure', async (t) => {
	const result = await executeCommand('se2301 newratings --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.rating.tsv');
	t.false(result.includes('Error: API call failed'));
});

test.serial('CLI - newratings command forbidden as a user', async (t) => {
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username sere --password sere');
	const result = await executeCommand('se2301 newratings --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.ratings.tsv');
	t.false(result.includes('Error: API call failed'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - newratings command forbidden as logged in', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 newratings --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.ratings.tsv');
	t.true(result.includes('Login required'));
	await executeCommand('se2301 logout');
	await executeCommand('se2301 login --username 1 --password 1');
});

test.serial('CLI - title command success', async (t) => {
	const result = await executeCommand('se2301 title --titleID tt0000929');
	t.true(result.includes('Title details: {\n' +
		'  tconst: \'tt0000929\',\n' +
		'  titleType: \'short\',\n' +
		'  originalTitle: \'Klebolin klebt alles\',\n' +
		'  img_url_asset: \'\\\\N\',\n' +
		'  startYear: 1990,\n' +
		'  endYear: null,\n' +
		'  genres: [ \'Comedy\', \'Short\' ],\n' +
		'  titlesAkas: [\n' +
		'    {\n' +
		'      akaTitle: \'Willys Streiche: Klebolin klebt alles\',\n' +
		'      regionAbbrev: \'DE\'\n' +
		'    },\n' +
		'    { akaTitle: \'Klebolin klebt alles\', regionAbbrev: \'\' },\n' +
		'    { akaTitle: \'Klebolin klebt alles\', regionAbbrev: \'DE\' },\n' +
		'    {\n' +
		'      akaTitle: \'Willys Streiche: Klebolin klebt alles\',\n' +
		'      regionAbbrev: \'DE\'\n' +
		'    },\n' +
		'    { akaTitle: \'Klebolin klebt alles\', regionAbbrev: \'\' },\n' +
		'    { akaTitle: \'Klebolin klebt alles\', regionAbbrev: \'DE\' }\n' +
		'  ],\n' +
		'  principals: [\n' +
		'    { nameID: \'nm0066941\', name: \'Ernst Behmer\', category: \'actor\' },\n' +
		'    { nameID: \'nm0170183\', name: \'Victor Colani\', category: \'actor\' },\n' +
		'    { nameID: \'nm0092290\', name: \'Curt Bois\', category: \'actor\' },\n' +
		'    {\n' +
		'      nameID: \'nm0093361\',\n' +
		'      name: \'Heinrich Bolten-Baeckers\',\n' +
		'      category: \'director\'\n' +
		'    },\n' +
		'    {\n' +
		'      nameID: \'nm1902148\',\n' +
		'      name: \'Alfred Duskes\',\n' +
		'      category: \'producer\'\n' +
		'    },\n' +
		'    {\n' +
		'      nameID: \'nm0667386\',\n' +
		'      name: \'Charles Paulus\',\n' +
		'      category: \'cinematographer\'\n' +
		'    }\n' +
		'  ],\n' +
		'  rating: [ { avRating: 5.3, nVotes: 46 } ]\n' +
		'}\n'));
});

test.serial('CLI - title command failure', async (t) => {
	const result = await executeCommand('se2301 title --titleID notitle');
	t.false(result.includes('Error: Failed to fetch title details'));});

test.serial('CLI - title command forbidden', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 title --titleID tt0000929');
	t.true(result.includes('Login required'));
	await executeCommand('se2301 login --username sere --password sere');
});

test.serial('CLI - searchtitle command success', async (t) => {
	const result = await executeCommand('se2301 searchtitle --titlepart Non')
	t.true(result.includes('Search results: [\n' +
		'  {\n' +
		'    tconst: \'tt0093646\',\n' +
		'    titleType: \'short\',\n' +
		'    originalTitle: \'Nonstop\',\n' +
		'    img_url_asset: \'https://image.tmdb.org/t/p/{width_variable}/iFIazBvTyM9e2U79RTKmoG3qrzp.jpg\',\n' +
		'    startYear: 1990,\n' +
		'    endYear: null,\n' +
		'    genres: [ \'Drama\', \'Short\' ],\n' +
		'    titlesAkas: [ [Object], [Object] ],\n' +
		'    principals: [\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object]\n' +
		'    ],\n' +
		'    rating: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    tconst: \'tt0101837\',\n' +
		'    titleType: \'tvEpisode\',\n' +
		'    originalTitle: \'Cannonball\',\n' +
		'    img_url_asset: \'\\\\N\',\n' +
		'    startYear: 1991,\n' +
		'    endYear: null,\n' +
		'    genres: [ \'Comedy\', \'Crime\' ],\n' +
		'    titlesAkas: [\n' +
		'      [Object], [Object], [Object],\n' +
		'      [Object], [Object], [Object],\n' +
		'      [Object], [Object], [Object],\n' +
		'      [Object], [Object], [Object],\n' +
		'      [Object], [Object], [Object],\n' +
		'      [Object], [Object], [Object],\n' +
		'      [Object], [Object]\n' +
		'    ],\n' +
		'    principals: [\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object]\n' +
		'    ],\n' +
		'    rating: [ [Object] ]\n' +
		'  }\n' +
		']\n'));
});

test.serial('CLI - searchtitle command failure', async (t) => {
	const result = await executeCommand('se2301 searchtitle --titlepart softeng23-01')
	t.false(result.includes('Error: Failed to fetch search results'));
});

test.serial('CLI - searchtitle command forbidden', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 searchtitle --titlepart Non')
	t.true(result.includes('Login required'));
	await executeCommand('se2301 login --username sere --password sere');
});

test.serial('CLI - bygenre command success no format', async (t) => {
	const result = await executeCommand('se2301 bygenre --genre Thriller --min 7.5 --from 1990');
	t.true(result.includes('By Genre results: [\n' +
		'  {\n' +
		'    tconst: \'tt0098962\',\n' +
		'    titleType: \'short\',\n' +
		'    originalTitle: \'12:01 PM\',\n' +
		'    img_url_asset: \'https://image.tmdb.org/t/p/{width_variable}/sBWKO6xnzAxnXCup7JENu15ZIoV.jpg\',\n' +
		'    startYear: 1991,\n' +
		'    endYear: null,\n' +
		'    genres: [ \'Sci-Fi\', \'Short\', \'Thriller\' ],\n' +
		'    titlesAkas: [ [Object], [Object], [Object], [Object], [Object], [Object] ],\n' +
		'    principals: [\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object]\n' +
		'    ],\n' +
		'    rating: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    tconst: \'tt0099746\',\n' +
		'    titleType: \'tvEpisode\',\n' +
		'    originalTitle: \'La porte secrète\',\n' +
		'    img_url_asset: \'\\\\N\',\n' +
		'    startYear: 1990,\n' +
		'    endYear: null,\n' +
		'    genres: [ \'Thriller\' ],\n' +
		'    titlesAkas: [ [Object], [Object] ],\n' +
		'    principals: [\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object]\n' +
		'    ],\n' +
		'    rating: [ [Object] ]\n' +
		'  }\n' +
		']\n'));
});

test.serial('CLI - bygenre command success csv', async (t) => {
	const result = await executeCommand('se2301 bygenre --genre Thriller --min 7.5 --from 1990 --format csv');
	t.true(result.includes('By Genre results: endYear,genres.0,genres.1,genres.2,img_url_asset,originalTitle,principals.0.category,principals.0.name,principals.0.nameID,principals.1.category,principals.1.name,principals.1.nameID,principals.2.category,principals.2.name,principals.2.nameID,principals.3.category,principals.3.name,principals.3.nameID,principals.4.category,principals.4.name,principals.4.nameID,principals.5.category,principals.5.name,principals.5.nameID,principals.6.category,principals.6.name,principals.6.nameID,principals.7.category,principals.7.name,principals.7.nameID,principals.8.category,principals.8.name,principals.8.nameID,principals.9.category,principals.9.name,principals.9.nameID,rating.0.avRating,rating.0.nVotes,startYear,tconst,titleType,titlesAkas.0.akaTitle,titlesAkas.0.regionAbbrev,titlesAkas.1.akaTitle,titlesAkas.1.regionAbbrev,titlesAkas.2.akaTitle,titlesAkas.2.regionAbbrev,titlesAkas.3.akaTitle,titlesAkas.3.regionAbbrev,titlesAkas.4.akaTitle,titlesAkas.4.regionAbbrev,titlesAkas.5.akaTitle,titlesAkas.5.regionAbbrev\n' +
		',Sci-Fi,Short,Thriller,https://image.tmdb.org/t/p/{width_variable}/sBWKO6xnzAxnXCup7JENu15ZIoV.jpg,12:01 PM,cinematographer,Charlie Lieberman,nm0509372,actress,Jane Alden,nm0017468,actor,Don Amendolia,nm0024596,actor,John Bachelder,nm0045402,actress,Laura Harrington,nm0364307,director,Jonathan Heap,nm0372421,writer,Stephen Tolkin,nm0006809,writer,Richard Lupoff,nm0526981,producer,Teresa E. Kounin,nm0468009,composer,Stephen Melillo,nm0577755,7.60,1467,1991,tt0098962,short,12:01 PM,,12:01 PM,US,12:01 дня,SUHH,12:01 PM,,12:01 PM,US,12:01 дня,SUHH\n' +
		',Thriller,,,\\N,La porte secrète,actress,Bibi Andersson,nm0000761,actor,Michael Sarrazin,nm0765546,actor,Marc de Jonge,nm0209030,actress,Claudine Auger,nm0000805,director,Danièle J. Suissa,nm0837657,writer,Pierre Billon,nm0082582,writer,Donald Martin,nm0003798,composer,François Dompierre,nm0006042,editor,Jean Beaudoin,nm0003517,,,,8.30,9,1990,tt0099746,tvEpisode,La porte secrète,FR,La porte secrète,FR,,,,,,,,\n' +
		'\n'));
});

test.serial('CLI - bygenre command success json', async (t) => {
	const result = await executeCommand('se2301 bygenre --genre Thriller --min 7.5 --from 1990 --format json');
	t.true(result.includes('By Genre results: [\n' +
		'  {\n' +
		'    tconst: \'tt0098962\',\n' +
		'    titleType: \'short\',\n' +
		'    originalTitle: \'12:01 PM\',\n' +
		'    img_url_asset: \'https://image.tmdb.org/t/p/{width_variable}/sBWKO6xnzAxnXCup7JENu15ZIoV.jpg\',\n' +
		'    startYear: 1991,\n' +
		'    endYear: null,\n' +
		'    genres: [ \'Sci-Fi\', \'Short\', \'Thriller\' ],\n' +
		'    titlesAkas: [ [Object], [Object], [Object], [Object], [Object], [Object] ],\n' +
		'    principals: [\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object]\n' +
		'    ],\n' +
		'    rating: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    tconst: \'tt0099746\',\n' +
		'    titleType: \'tvEpisode\',\n' +
		'    originalTitle: \'La porte secrète\',\n' +
		'    img_url_asset: \'\\\\N\',\n' +
		'    startYear: 1990,\n' +
		'    endYear: null,\n' +
		'    genres: [ \'Thriller\' ],\n' +
		'    titlesAkas: [ [Object], [Object] ],\n' +
		'    principals: [\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object], [Object],\n' +
		'      [Object]\n' +
		'    ],\n' +
		'    rating: [ [Object] ]\n' +
		'  }\n' +
		']\n'));
});

test.serial('CLI - bygenre command failure', async (t) => {
	const result = await executeCommand('se2301 bygenre --genre Thriller --min 7.5 --from 2000');
	t.true(result.includes('By Genre results: []'));
});

test.serial('CLI - bygenre command forbidden', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 bygenre --genre Thriller --min 7.5 --from 1980')
	t.true(result.includes('Login required'));
	await executeCommand('se2301 login --username sere --password sere');
});

test.serial('CLI - name command success no format', async (t) => {
	const result = await executeCommand('se2301 name --nameid nm0000019');
	t.true(result.includes('Name Biography: [\n' +
		'  {\n' +
		'    nconst: \'nm0000019\',\n' +
		'    primaryName: \'Federico Fellini\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/jH2VnHAuI0UbTWsnrjMPro0fC9j.jpg\',\n' +
		'    birthYear: 1920,\n' +
		'    primaryProfession: \'writer,director,actor\',\n' +
		'    deathYear: 1993,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  }\n' +
		']\n'));
});

test.serial('CLI - name command success csv', async (t) => {
	const result = await executeCommand('se2301 name --nameid nm0000019 --format csv');
	t.true(result.includes('Name Biography: birthYear,deathYear,imgUrl,nameTitles.0.category,nameTitles.0.titleID,nconst,primaryName,primaryProfession\n' +
		'1920,1993,https://image.tmdb.org/t/p/{width_variable}/jH2VnHAuI0UbTWsnrjMPro0fC9j.jpg,director,tt0098606,nm0000019,Federico Fellini,"writer,director,actor"\n' +
		'\n'));
});

test.serial('CLI - name command success json', async (t) => {
	const result = await executeCommand('se2301 name --nameid nm0000019 --format json');
	t.true(result.includes('Name Biography: [\n' +
		'  {\n' +
		'    nconst: \'nm0000019\',\n' +
		'    primaryName: \'Federico Fellini\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/jH2VnHAuI0UbTWsnrjMPro0fC9j.jpg\',\n' +
		'    birthYear: 1920,\n' +
		'    primaryProfession: \'writer,director,actor\',\n' +
		'    deathYear: 1993,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  }\n' +
		']\n'));
});

test.serial('CLI - name command failure', async (t) => {
	const result = await executeCommand('se2301 name --nameid noid');
	t.false(result.includes('Error: Failed to fetch Name Biography: Actor/actress not found'));
});

test.serial('CLI - name command forbidden', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 name --nameid nm0000019')
	t.true(result.includes('Login required'));
	await executeCommand('se2301 login --username sere --password sere');
});


test.serial('CLI - searchname command success no format', async (t) => {
	const result = await executeCommand('se2301 searchname --name George');
	t.true(result.includes('Search Name results: [\n' +
		'  {\n' +
		'    nconst: \'nm0000123\',\n' +
		'    primaryName: \'George Clooney\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/4s3wI0bqOP7K3hhcmKqV6m3GYiQ.jpg\',\n' +
		'    birthYear: 1961,\n' +
		'    primaryProfession: \'actor,producer,director\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0001421\',\n' +
		'    primaryName: \'George Kennedy\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/fIVmcPEcPmh0Rbx4mYf9aneCmDe.jpg\',\n' +
		'    birthYear: 1925,\n' +
		'    primaryProfession: \'actor,miscellaneous,soundtrack\',\n' +
		'    deathYear: 2016,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0048468\',\n' +
		'    primaryName: \'George Baker\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/zMubzCZPcpfeTJpc7QjgEwAg5gd.jpg\',\n' +
		'    birthYear: 1931,\n' +
		'    primaryProfession: \'actor,writer,soundtrack\',\n' +
		'    deathYear: 2011,\n' +
		'    nameTitles: [ [Object], [Object], [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0143426\',\n' +
		'    primaryName: \'George Casey\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: 1933,\n' +
		'    primaryProfession: \'producer,director,writer\',\n' +
		'    deathYear: 2017,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0214172\',\n' +
		'    primaryName: \'Georgette Dee\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: 1958,\n' +
		'    primaryProfession: \'actress,writer\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0247642\',\n' +
		'    primaryName: \'George Eastman\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/aE8C5uGqystShl13VcrZSjcraJ5.jpg\',\n' +
		'    birthYear: 1942,\n' +
		'    primaryProfession: \'writer,actor,director\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0253652\',\n' +
		'    primaryName: \'George Eliot\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: 1819,\n' +
		'    primaryProfession: \'writer\',\n' +
		'    deathYear: 1880,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0264480\',\n' +
		'    primaryName: \'George Faber\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: 1960,\n' +
		'    primaryProfession: \'producer,miscellaneous,script_department\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0288708\',\n' +
		'    primaryName: \'George Fowler\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: 1912,\n' +
		'    primaryProfession: \'production_manager,assistant_director,producer\',\n' +
		'    deathYear: 1993,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0313443\',\n' +
		'    primaryName: \'Götz George\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/jGnP1ErwHBMobS0yltcpBrNKa2O.jpg\',\n' +
		'    birthYear: 1938,\n' +
		'    primaryProfession: \'actor,stunts,producer\',\n' +
		'    deathYear: 2016,\n' +
		'    nameTitles: [ [Object], [Object], [Object], [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0313452\',\n' +
		'    primaryName: \'Isaac George\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/pyO4AnWGdYq43tcIYU8edFsOo5G.jpg\',\n' +
		'    birthYear: 1957,\n' +
		'    primaryProfession: \'actor,composer\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0313702\',\n' +
		'    primaryName: \'Tom Georgeson\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/klErtEz52vq6VGZNunck8IjsD1l.jpg\',\n' +
		'    birthYear: 1937,\n' +
		'    primaryProfession: \'actor,soundtrack\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0413195\',\n' +
		'    primaryName: \'George Jackos\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/AfT6qsem9wwi368go8UrEMtUroZ.jpg\',\n' +
		'    birthYear: null,\n' +
		'    primaryProfession: \'actor\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0583434\',\n' +
		'    primaryName: \'George Meyer-Goll\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: 1949,\n' +
		'    primaryProfession: \'actor,soundtrack\',\n' +
		'    deathYear: 2023,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0799442\',\n' +
		'    primaryName: \'Georges Simenon\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/oxehFO24YpEMhK4YUlL50px6C8v.jpg\',\n' +
		'    birthYear: 1903,\n' +
		'    primaryProfession: \'writer,miscellaneous\',\n' +
		'    deathYear: 1989,\n' +
		'    nameTitles: [ [Object], [Object], [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0857163\',\n' +
		'    primaryName: \'George H. Thausanij\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: null,\n' +
		'    primaryProfession: \'actor\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0954865\',\n' +
		'    primaryName: \'George Zenios\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/8we4W1QXfl75PXgFxTRqDZZUuFH.jpg\',\n' +
		'    birthYear: null,\n' +
		'    primaryProfession: \'actor,writer,director\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm6369851\',\n' +
		'    primaryName: \'George Kobi\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: null,\n' +
		'    primaryProfession: \'\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  }\n' +
		']\n'));
});

test.serial('CLI - searchname command success csv', async (t) => {
	const result = await executeCommand('se2301 searchname --name George --format csv');
	t.true(result.includes('Search Name results: birthYear,deathYear,imgUrl,nameTitles.0.category,nameTitles.0.titleID,nameTitles.1.category,nameTitles.1.titleID,nameTitles.2.category,nameTitles.2.titleID,nameTitles.3.category,nameTitles.3.titleID,nconst,primaryName,primaryProfession\n' +
		'1961,,https://image.tmdb.org/t/p/{width_variable}/4s3wI0bqOP7K3hhcmKqV6m3GYiQ.jpg,actor,tt0100718,,,,,,,nm0000123,George Clooney,"actor,producer,director"\n' +
		'1925,2016,https://image.tmdb.org/t/p/{width_variable}/fIVmcPEcPmh0Rbx4mYf9aneCmDe.jpg,actor,tt0096877,,,,,,,nm0001421,George Kennedy,"actor,miscellaneous,soundtrack"\n' +
		'1931,2011,https://image.tmdb.org/t/p/{width_variable}/zMubzCZPcpfeTJpc7QjgEwAg5gd.jpg,actor,tt0100439,actor,tt0100658,actor,tt0102424,,,nm0048468,George Baker,"actor,writer,soundtrack"\n' +
		'1933,2017,\\N,director,tt0082473,,,,,,,nm0143426,George Casey,"producer,director,writer"\n' +
		'1958,,\\N,actress,tt0099013,,,,,,,nm0214172,Georgette Dee,"actress,writer"\n' +
		'1942,,https://image.tmdb.org/t/p/{width_variable}/aE8C5uGqystShl13VcrZSjcraJ5.jpg,director,tt0097874,,,,,,,nm0247642,George Eastman,"writer,actor,director"\n' +
		'1819,1880,\\N,writer,tt0101271,,,,,,,nm0253652,George Eliot,writer\n' +
		'1960,,\\N,producer,tt0101358,,,,,,,nm0264480,George Faber,"producer,miscellaneous,script_department"\n' +
		'1912,1993,\\N,writer,tt0080039,,,,,,,nm0288708,George Fowler,"production_manager,assistant_director,producer"\n' +
		'1938,2016,https://image.tmdb.org/t/p/{width_variable}/jGnP1ErwHBMobS0yltcpBrNKa2O.jpg,actor,tt0100754,actor,tt0103046,actor,tt0103049,actor,tt0103050,nm0313443,Götz George,"actor,stunts,producer"\n' +
		'1957,,https://image.tmdb.org/t/p/{width_variable}/pyO4AnWGdYq43tcIYU8edFsOo5G.jpg,actor,tt0098294,,,,,,,nm0313452,Isaac George,"actor,composer"\n' +
		'1937,,https://image.tmdb.org/t/p/{width_variable}/klErtEz52vq6VGZNunck8IjsD1l.jpg,actor,tt0097822,,,,,,,nm0313702,Tom Georgeson,"actor,soundtrack"\n' +
		',,https://image.tmdb.org/t/p/{width_variable}/AfT6qsem9wwi368go8UrEMtUroZ.jpg,actor,tt0095783,,,,,,,nm0413195,George Jackos,actor\n' +
		'1949,2023,\\N,actor,tt0102857,,,,,,,nm0583434,George Meyer-Goll,"actor,soundtrack"\n' +
		'1903,1989,https://image.tmdb.org/t/p/{width_variable}/oxehFO24YpEMhK4YUlL50px6C8v.jpg,writer,tt0095661,writer,tt0102378,writer,tt0102379,,,nm0799442,Georges Simenon,"writer,miscellaneous"\n' +
		',,\\N,actor,tt0094004,,,,,,,nm0857163,George H. Thausanij,actor\n' +
		',,https://image.tmdb.org/t/p/{width_variable}/8we4W1QXfl75PXgFxTRqDZZUuFH.jpg,actor,tt0095783,,,,,,,nm0954865,George Zenios,"actor,writer,director"\n' +
		',,\\N,self,tt0098992,,,,,,,nm6369851,George Kobi,\n' +
		'\n'));
});

test.serial('CLI - searchname command success json', async (t) => {
	const result = await executeCommand('se2301 searchname --name George --format json');
	t.true(result.includes('Search Name results: [\n' +
		'  {\n' +
		'    nconst: \'nm0000123\',\n' +
		'    primaryName: \'George Clooney\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/4s3wI0bqOP7K3hhcmKqV6m3GYiQ.jpg\',\n' +
		'    birthYear: 1961,\n' +
		'    primaryProfession: \'actor,producer,director\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0001421\',\n' +
		'    primaryName: \'George Kennedy\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/fIVmcPEcPmh0Rbx4mYf9aneCmDe.jpg\',\n' +
		'    birthYear: 1925,\n' +
		'    primaryProfession: \'actor,miscellaneous,soundtrack\',\n' +
		'    deathYear: 2016,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0048468\',\n' +
		'    primaryName: \'George Baker\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/zMubzCZPcpfeTJpc7QjgEwAg5gd.jpg\',\n' +
		'    birthYear: 1931,\n' +
		'    primaryProfession: \'actor,writer,soundtrack\',\n' +
		'    deathYear: 2011,\n' +
		'    nameTitles: [ [Object], [Object], [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0143426\',\n' +
		'    primaryName: \'George Casey\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: 1933,\n' +
		'    primaryProfession: \'producer,director,writer\',\n' +
		'    deathYear: 2017,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0214172\',\n' +
		'    primaryName: \'Georgette Dee\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: 1958,\n' +
		'    primaryProfession: \'actress,writer\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0247642\',\n' +
		'    primaryName: \'George Eastman\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/aE8C5uGqystShl13VcrZSjcraJ5.jpg\',\n' +
		'    birthYear: 1942,\n' +
		'    primaryProfession: \'writer,actor,director\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0253652\',\n' +
		'    primaryName: \'George Eliot\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: 1819,\n' +
		'    primaryProfession: \'writer\',\n' +
		'    deathYear: 1880,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0264480\',\n' +
		'    primaryName: \'George Faber\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: 1960,\n' +
		'    primaryProfession: \'producer,miscellaneous,script_department\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0288708\',\n' +
		'    primaryName: \'George Fowler\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: 1912,\n' +
		'    primaryProfession: \'production_manager,assistant_director,producer\',\n' +
		'    deathYear: 1993,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0313443\',\n' +
		'    primaryName: \'Götz George\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/jGnP1ErwHBMobS0yltcpBrNKa2O.jpg\',\n' +
		'    birthYear: 1938,\n' +
		'    primaryProfession: \'actor,stunts,producer\',\n' +
		'    deathYear: 2016,\n' +
		'    nameTitles: [ [Object], [Object], [Object], [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0313452\',\n' +
		'    primaryName: \'Isaac George\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/pyO4AnWGdYq43tcIYU8edFsOo5G.jpg\',\n' +
		'    birthYear: 1957,\n' +
		'    primaryProfession: \'actor,composer\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0313702\',\n' +
		'    primaryName: \'Tom Georgeson\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/klErtEz52vq6VGZNunck8IjsD1l.jpg\',\n' +
		'    birthYear: 1937,\n' +
		'    primaryProfession: \'actor,soundtrack\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0413195\',\n' +
		'    primaryName: \'George Jackos\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/AfT6qsem9wwi368go8UrEMtUroZ.jpg\',\n' +
		'    birthYear: null,\n' +
		'    primaryProfession: \'actor\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0583434\',\n' +
		'    primaryName: \'George Meyer-Goll\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: 1949,\n' +
		'    primaryProfession: \'actor,soundtrack\',\n' +
		'    deathYear: 2023,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0799442\',\n' +
		'    primaryName: \'Georges Simenon\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/oxehFO24YpEMhK4YUlL50px6C8v.jpg\',\n' +
		'    birthYear: 1903,\n' +
		'    primaryProfession: \'writer,miscellaneous\',\n' +
		'    deathYear: 1989,\n' +
		'    nameTitles: [ [Object], [Object], [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0857163\',\n' +
		'    primaryName: \'George H. Thausanij\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: null,\n' +
		'    primaryProfession: \'actor\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm0954865\',\n' +
		'    primaryName: \'George Zenios\',\n' +
		'    imgUrl: \'https://image.tmdb.org/t/p/{width_variable}/8we4W1QXfl75PXgFxTRqDZZUuFH.jpg\',\n' +
		'    birthYear: null,\n' +
		'    primaryProfession: \'actor,writer,director\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  },\n' +
		'  {\n' +
		'    nconst: \'nm6369851\',\n' +
		'    primaryName: \'George Kobi\',\n' +
		'    imgUrl: \'\\\\N\',\n' +
		'    birthYear: null,\n' +
		'    primaryProfession: \'\',\n' +
		'    deathYear: null,\n' +
		'    nameTitles: [ [Object] ]\n' +
		'  }\n' +
		']\n'));
});

test.serial('CLI - searchname command failure', async (t) => {
	const result = await executeCommand('se2301 searchname --name noname');
	t.true(result.includes('Search Name results: []'));
});

test.serial('CLI - searchname command forbidden', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 searchname --name George')
	t.true(result.includes('Login required'));
	await executeCommand('se2301 login --username sere --password sere');
});

test.serial('CLI - logout command success', async (t) => {
	const result = await executeCommand('se2301 logout');
	t.true(result.includes('Logout successful'));
});

test.serial('CLI - logout command failure', async (t) => {
	await executeCommand('se2301 logout');
	const result = await executeCommand('se2301 logout')
	t.true(result.includes('Login required'));
});
