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


test('CLI - login command', async (t) => {
	const result = await executeCommand('se2301 login --username testuser --password testpass');
	t.true(result.includes('Login successful'));
});


test('CLI - adduser command', async (t) => {
	const result = await executeCommand('se2301 adduser --username newuser --password newpass');
	t.true(result.includes('User added successfully'));
});

test('CLI - user command', async (t) => {
	const result = await executeCommand('se2301 user --username testuser');
	t.true(result.includes('User details:'));
});

test('CLI - healthcheck command', async (t) => {
	const result = await executeCommand('se2301 healthcheck');
	t.true(result.includes('Health check passed'));
});

test('CLI - resetall command', async (t) => {
	const result = await executeCommand('se2301 resetall');
	t.true(result.includes('Reset all successful'));
});

test('CLI - newtitles command', async (t) => {
	const result = await executeCommand('se2301 newtitles --filename C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.basics.tsv');
	t.true(result.includes('API call successful'));
});

test('CLI - newnames command', async (t) => {
	const result = await executeCommand('se2301 newnames --filename C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_name.basics.tsv');
	t.true(result.includes('API call successful'));
});


test('CLI - newakas command', async (t) => {
	const result = await executeCommand('se2301 newakas --filename C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.akas.tsv');
	t.true(result.includes('API call successful'));
});

test('CLI - newcrew command', async (t) => {
	const result = await executeCommand('se2301 newcrew --filename C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.crew.tsv');
	t.true(result.includes('API call successful'));
});

test('CLI - newepisode command', async (t) => {
	const result = await executeCommand('se2301 newepisode --filename C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.episode.tsv');
	t.true(result.includes('API call successful'));
});

test('CLI - newprincipals command', async (t) => {
	const result = await executeCommand('se2301 newprincipals --filename C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.principals.tsv');
	t.true(result.includes('API call successful'));
});

test('CLI - newratings command', async (t) => {
	const result = await executeCommand('se2301 newratings --filename C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.ratings.tsv');
	t.true(result.includes('API call successful'));
});

test('CLI - title command', async (t) => {
	const result = await executeCommand('se2301 title --titleID tt1234567');
	t.true(result.includes('Title details:'));
});

test('CLI - searchtitle command', async (t) => {
	const result = await executeCommand('se2301 searchtitle --titlepart Hango');
	t.true(result.includes('Search results:'));
});

test('CLI - bygenre command', async (t) => {
	const result = await executeCommand('se2301 bygenre --genre Action --min 7.5 --from 2000 --to 2020');
	t.true(result.includes('By Genre results:'));
});

test('CLI - name command', async (t) => {
	const result = await executeCommand('se2301 name --nameID nm1234567');
	t.true(result.includes('Name Biography:'));
});

test('CLI - searchname command', async (t) => {
	const result = await executeCommand('se2301 searchname --name John Doe');
	t.true(result.includes('Search Name results:'));
});

test('CLI - logout command', async (t) => {
	const result = await executeCommand('se2301 logout');
	t.true(result.includes('Logout successful'));
});
