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


test.serial('CLI - login command success', async (t) => {
	const result = await executeCommand('se2301 login --username 1 --password 1');
	t.true(result.includes('Login successful'));
});
test.serial('CLI - login command failure', async (t) => {
	const result = await executeCommand('se2301 login --username nonexistant --password nonexistant');
	t.false(result.includes('Error: Authentication failed'));
});

test.serial('CLI - adduser command success', async (t) => {
	const result = await executeCommand('se2301 adduser --username sere --password sere');
	t.true(result.includes('User added successfully'));
});

test.serial('CLI - adduser command failure', async (t) => {
	const result = await executeCommand('se2301 adduser --username nonexistant --password nonexistant');
	t.false(result.includes('Error: Failed to add user'));
});

test.serial('CLI - user command success', async (t) => {
	const result = await executeCommand('se2301 user --username sere');
	t.true(result.includes('username: \'sere\',\n' +
		'  email: \'g.seretakos@gmail.com\',\n' +
		'  first_name: \'George\',\n' +
		'  last_name: \'Seretakos\''));
});

test.serial('CLI - user command failure ', async (t) => {
	const result = await executeCommand('se2301 user --username nonexistant');
	t.false(result.includes('Error: User not found'));
});

test.serial('CLI - healthcheck command', async (t) => {
	const result = await executeCommand('se2301 healthcheck');
	t.true(result.includes('Health check passed'));
});

test.serial('CLI - resetall command', async (t) => {
	const result = await executeCommand('se2301 resetall');
	t.true(result.includes('Reset all successful'));
});

test.serial('CLI - newtitles command', async (t) => {
	const result = await executeCommand('se2301 newtitles --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.basics.tsv');
	t.true(result.includes('API call successful'));
});

test.serial('CLI - newnames command', async (t) => {
	const result = await executeCommand('se2301 newnames --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_name.basics.tsv');
	t.true(result.includes('API call successful'));
});


test.serial('CLI - newakas command', async (t) => {
	const result = await executeCommand('se2301 newakas --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.akas.tsv');
	t.true(result.includes('API call successful'));
});

test.serial('CLI - newcrew command', async (t) => {
	const result = await executeCommand('se2301 newcrew --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.crew.tsv');
	t.true(result.includes('API call successful'));
});

test.serial('CLI - newepisode command', async (t) => {
	const result = await executeCommand('se2301 newepisode --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.episode.tsv');
	t.true(result.includes('API call successful'));
});

test.serial('CLI - newprincipals command', async (t) => {
	const result = await executeCommand('se2301 newprincipals --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.principals.tsv');
	t.true(result.includes('API call successful'));
});

test.serial('CLI - newratings command', async (t) => {
	const result = await executeCommand('se2301 newratings --filename /Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.ratings.tsv');
	t.true(result.includes('API call successful'));
});

test.serial('CLI - title command', async (t) => {
	const result = await executeCommand('se2301 title --titleID tt0000929');
	t.true(result.includes('Title details:'));
});

test.serial('CLI - searchtitle command', async (t) => {
	const result = await executeCommand('se2301 searchtitle --titlepart Non');
	t.true(result.includes('Search results:'));
});

test.serial('CLI - bygenre command', async (t) => {
	const result = await executeCommand('se2301 bygenre --genre Thriller --min 7.5 --from 1990 --to 2020');
	t.true(result.includes('By Genre results:'));
});

test.serial('CLI - name command', async (t) => {
	const result = await executeCommand('se2301 name --nameid nm0000019');
	t.true(result.includes('Name Biography:'));
});

test.serial('CLI - searchname command', async (t) => {
	const result = await executeCommand('se2301 searchname --name George');
	t.true(result.includes('Search Name results:'));
});

test.serial('CLI - logout command', async (t) => {
	const result = await executeCommand('se2301 logout');
	t.true(result.includes('Logout successful'));
});
