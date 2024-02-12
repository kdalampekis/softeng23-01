import test from 'ava';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import fs from 'fs';
import { login, logout, adduser, user, healthcheck, resetall, newtitles, newakas, newnames, newcrew, newepisode, newprincipals, newratings, title, searchtitle, bygenre, name, searchname } from '../source/apiClient.js';
import path from "path";
import {fileURLToPath} from "url";

const mock = new MockAdapter(axios);

// Helper function to set up the token file for testing
function setupTokenFile() {
	const dir = path.dirname(fileURLToPath(import.meta.url));
	const tokenFilePath = `${dir}/../source/softeng20bAPI.token`;
	return tokenFilePath;
}

// Helper function to clean up the token file after testing


// Test login function
test.serial('login - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const expectedToken = '';
	const username = '1';
	const password = '1';

	mock.onPost('http://127.0.0.1:9876/ntuaflix_api/login/?format=json', {
		username,
		password,
	}).reply(200, { token: expectedToken });
	fs.writeFileSync(tokenFilePath, expectedToken);

	await login(username, password, 'json');
	const actualToken = fs.readFileSync(tokenFilePath, 'utf-8').trim();
	t.is(actualToken, expectedToken);

});

test.serial('login - failure', async (t) => {
	const username = 'testuser';
	const password = 'testpassword';

	mock.onPost('http://127.0.0.1:9876/ntuaflix_api/login/?format=json', {
		username,
		password,
	}).reply(401, { message: 'Authentication failed' });

	await t.throwsAsync(async () => {
		await login(username, password, 'json');
	}, { instanceOf: Error, message: 'Error: Authentication failed' });
});



test.serial('adduser - success', async (t) => {

	const username = 'sere';
	const password = 'sere';

	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/usermod/${username}/${password}/?format=json`).reply(200, { message: 'User added successfully' });

	await adduser(username, password, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.post;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/usermod/${username}/${password}/?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

});

test.serial('adduser - failure', async (t) => {
	const username = 'sere';
	const password = 'sere';

	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/usermod/${username}/${password}/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await adduser(username, password, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to add user' });
});

test.serial('user - success', async (t) => {
	const tokenFilePath = setupTokenFile();

	const username = 'sere';
	const userDetails = { id: 2, username: 'sere', email: 'g.seretakos@gmail.com' };

	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/admin/users/${username}?format=json`).reply(200, userDetails);

	await user(username, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/users/${username}?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

});

test.serial('user - user not found', async (t) => {
	const username = 'nonexistentuser';

	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/admin/users/${username}?format=json`).reply(404);

	await t.throwsAsync(async () => {
		await user(username, 'json');
	}, { instanceOf: Error, message: 'Error: User not found' });
});

test.serial('user - failure', async (t) => {
	const username = 'testuser';

	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/admin/users/${username}?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await user(username, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to fetch user details' });
});

test.serial('healthcheck - success', async (t) => {
	const tokenFilePath = setupTokenFile();

	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/admin/healthcheck?format=json`).reply(200);

	await healthcheck('json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/healthcheck?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

});

test.serial('healthcheck - failure', async (t) => {
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/admin/healthcheck/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await healthcheck('json');
	}, { instanceOf: Error, message: 'Error: Health check failed' });
});

test.serial('resetall - success', async (t) => {
	const tokenFilePath = setupTokenFile();

	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/resetall/?format=json`).reply(200);

	await resetall('json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.post;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/resetall/?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

});

test.serial('resetall - failure', async (t) => {
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/resetall/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await resetall('json');
	}, { instanceOf: Error, message: 'Error: Failed to reset all' });
});

test.serial('newtitles - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.basics.tsv';

	// Mock the POST request and provide a successful response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titlebasics/?format=json`).reply(200, { success: true });

	await newtitles(filename, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.post;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/upload/titlebasics/?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));
	t.true(config.headers['Content-Type'].startsWith('multipart/form-data'));
	t.true(config.headers['Accept'].startsWith('application/json'));

	// Assert that the FormData contains the file
	const formData = config.data;
	t.true(formData instanceof FormData);
	t.true(formData.has('tsv_file'));

});

test.serial('newtitles - failure', async (t) => {
	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.basics.tsv';

	// Mock the POST request and provide an error response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titlebasics/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newtitles(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test.serial('newakas - success', async (t) => {
	const tokenFilePath = setupTokenFile();

	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.akas.tsv';
	const formData = new FormData();
	formData.append('tsv_file', 'contents', filename);

	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleakas/?format=json`).reply(200, { message: 'Upload successful' });

	await newakas(filename, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.post;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleakas/?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

});

test.serial('newakas - failure', async (t) => {
	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.akas.tsv';
	const formData = new FormData();
	formData.append('tsv_file', 'contents', filename);

	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleakas/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newakas(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test.serial('newnames - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.akas.tsv';

	// Mock the POST request and provide a successful response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/namebasics/?format=json`).reply(200, { success: true });

	await newnames(filename, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.post;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/upload/namebasics/?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));
	t.true(config.headers['Content-Type'].startsWith('multipart/form-data'));
	t.true(config.headers['Accept'].startsWith('application/json'));

	// Assert that the FormData contains the file
	const formData = config.data;
	t.true(formData instanceof FormData);
	t.true(formData.has('tsv_file'));

});

test.serial('newnames - failure', async (t) => {
	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.akas.tsv';

	// Mock the POST request and provide an error response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/namebasics/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newnames(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test.serial('newcrew - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.crew.tsv';

	// Mock the POST request and provide a successful response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titlecrew/?format=json`).reply(200, { success: true });

	await newcrew(filename, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.post;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/upload/titlecrew/?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));
	t.true(config.headers['Content-Type'].startsWith('multipart/form-data'));
	t.true(config.headers['Accept'].startsWith('application/json'));

	// Assert that the FormData contains the file
	const formData = config.data;
	t.true(formData instanceof FormData);
	t.true(formData.has('tsv_file'));

});

test.serial('newcrew - failure', async (t) => {
	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.crew.tsv';

	// Mock the POST request and provide an error response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titlecrew/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newcrew(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test.serial('newepisode - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.episode.tsv';

	// Mock the POST request and provide a successful response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleepisode/?format=json`).reply(200, { success: true });

	await newepisode(filename, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.post;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleepisode/?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));
	t.true(config.headers['Content-Type'].startsWith('multipart/form-data'));
	t.true(config.headers['Accept'].startsWith('application/json'));

	// Assert that the FormData contains the file
	const formData = config.data;
	t.true(formData instanceof FormData);
	t.true(formData.has('tsv_file'));

});

test.serial('newepisode - failure', async (t) => {
	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.episode.tsv';

	// Mock the POST request and provide an error response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleepisode/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newepisode(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test.serial('newprincipals - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.principals.tsv';

	// Mock the POST request and provide a successful response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleprincipals/?format=json`).reply(200, { success: true });

	await newprincipals(filename, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.post;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleprincipals/?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));
	t.true(config.headers['Content-Type'].startsWith('multipart/form-data'));
	t.true(config.headers['Accept'].startsWith('application/json'));

	// Assert that the FormData contains the file
	const formData = config.data;
	t.true(formData instanceof FormData);
	t.true(formData.has('tsv_file'));

});

test.serial('newprincipals - failure', async (t) => {
	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.principals.tsv';

	// Mock the POST request and provide an error response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleprincipals/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newprincipals(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test.serial('newratings - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.ratings.tsv';

	// Mock the POST request and provide a successful response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleratings/?format=json`).reply(200, { success: true });

	await newratings(filename, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.post;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleratings/?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	// Assert that the FormData contains the file
	const formData = config.data;
	t.true(formData instanceof FormData);
	t.true(formData.has('tsv_file'));

});

test.serial('newratings - failure', async (t) => {
	const filename = '/Users/kostasbekis/WebstormProjects/softeng23-01/back-end/Database/Data/truncated_title.ratings.tsv';

	// Mock the POST request and provide an error response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleratings/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newratings(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test.serial('title - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const titleID = 'tt0097559';

	// Mock the GET request and provide a successful response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/title/${titleID}?format=json`).reply(200, { });

	await title(titleID, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/title/${titleID}?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	// Assert the response data
	const responseData = config.data;
	t.deepEqual(responseData, { title: 'Idomeneo' });

});

test.serial('title - failure', async (t) => {
	const titleID = '456';

	// Mock the GET request and provide an error response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/title/${titleID}?format=json`).reply(404, { message: 'Title not found' });

	await t.throwsAsync(async () => {
		await title(titleID, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to fetch title details: Title not found' });
});

test.serial('searchtitle - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const titlePart = 'Non';

	// Mock the GET request and provide a successful response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/searchtitle/?title=${encodeURIComponent(titlePart)}&format=json`).reply(200, { results: ['Nonstop'] });

	await searchtitle(titlePart, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/searchtitle/?title=${encodeURIComponent(titlePart)}&format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	// Assert the response data
	const responseData = config.data;
	t.deepEqual(responseData, { results: ['Nonstop'] });

});

test.serial('searchtitle - failure', async (t) => {
	const titlePart = 'nonexistent';

	// Mock the GET request and provide an error response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/searchtitle/?title=${encodeURIComponent(titlePart)}&format=json`).reply(404, { message: 'No matching titles found' });

	await t.throwsAsync(async () => {
		await searchtitle(titlePart, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to fetch search results: No matching titles found' });
});

test.serial('bygenre - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const genre = 'Thriller';
	const minimumRating = 7.5;

	// Mock the GET request and provide a successful response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/bygenre/?genre=${encodeURIComponent(genre)}&minimumrating=${minimumRating}&format=json`).reply(200, { results: ['12:01 PM', 'La porte secrète'] });

	await bygenre(genre, minimumRating, null, null, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/bygenre/?genre=${encodeURIComponent(genre)}&minimumrating=${minimumRating}&format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	// Assert the response data
	const responseData = config.data;
	t.deepEqual(responseData, { results: ['12:01 PM', 'La porte secrète'] });

});

test.serial('bygenre - with optional parameters', async (t) => {
	const tokenFilePath = setupTokenFile();
	const genre = 'Drama';
	const minimumRating = 8.0;
	const yearFrom = 1980;
	const yearTo = 2000;

	// Mock the GET request and provide a successful response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/bygenre/?genre=${encodeURIComponent(genre)}&minimumrating=${minimumRating}&yearfrom=${yearFrom}&yearto=${yearTo}&format=json`).reply(200, { results: [] });

	await bygenre(genre, minimumRating, yearFrom, yearTo, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/bygenre/?genre=${encodeURIComponent(genre)}&minimumrating=${minimumRating}&yearfrom=${yearFrom}&yearto=${yearTo}&format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	// Assert the response data
	const responseData = config.data;
	t.deepEqual(responseData, { results: [] });

});

test.serial('bygenre - failure', async (t) => {
	const genre = 'Nonexistent';
	const minimumRating = 7.0;

	// Mock the GET request and provide an error response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/bygenre/?genre=${encodeURIComponent(genre)}&minimumrating=${minimumRating}&format=json`).reply(404, { message: 'No matching movies found' });

	await t.throwsAsync(async () => {
		await bygenre(genre, minimumRating, null, null, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to fetch By Genre results: No matching movies found' });
});

test.serial('name - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const nameid = 'nm0000019';

	// Mock the GET request and provide a successful response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/name/${nameid}?format=json`).reply(200, { biography: 'Name Biography: [\n' +
			'  {\n' +
			'    nconst: \'nm0066941\',\n' +
			'    primaryName: \'Ernst Behmer\',\n' +
			'    imgUrl: \'\\\\N\',\n' +
			'    birthYear: 1875,\n' +
			'    primaryProfession: \'actor\',\n' +
			'    deathYear: 1938,\n' +
			'    nameTitles: [ [Object] ]\n' +
			'  }\n' +
			']\n' });

	await name(nameid, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/name/${nameid}?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	// Assert the response data
	const responseData = config.data;
	t.deepEqual(responseData, {biography: 'Name Biography: [\n' +
			'  {\n' +
			'    nconst: \'nm0066941\',\n' +
			'    primaryName: \'Ernst Behmer\',\n' +
			'    imgUrl: \'\\\\N\',\n' +
			'    birthYear: 1875,\n' +
			'    primaryProfession: \'actor\',\n' +
			'    deathYear: 1938,\n' +
			'    nameTitles: [ [Object] ]\n' +
			'  }\n' +
			']\n'});

});

test.serial('name - failure', async (t) => {
	const nameID = 'nonexistent';

	// Mock the GET request and provide an error response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/name/${nameID}?format=json`).reply(404, { message: 'Error: Request failed with status code 404\n' });

	await t.throwsAsync(async () => {
		await name(nameID, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to fetch Name Biography: Actor/actress not found' });
});

test.serial('searchname - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const name = 'Curt';

	// Mock the GET request and provide a successful response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/searchname/?name=${encodeURIComponent(name)}?format=json`).reply(200, [
		{},
	]);

	await searchname(name, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/searchname/?name=${encodeURIComponent(name)}?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	// Assert the response data
	const responseData = config.data;
	t.deepEqual(responseData, [
		{ id: 'nm0092290', name: 'Curt Bois' },
	]);

});

test.serial('searchname - failure', async (t) => {
	const name = 'Nonexistent Actor';

	// Mock the GET request and provide an error response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/searchname/?name=${encodeURIComponent(name)}?format=json`).reply(404, { message: 'No results found' });

	await t.throwsAsync(async () => {
		await searchname(name, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to fetch Search Name results: No results found' });
});

test.serial('logout - success', async (t) => {
	const tokenFilePath = setupTokenFile();

	mock.onPost('http://127.0.0.1:9876/ntuaflix_api/logout/?format=json').reply(200);

	await logout('json');

	t.false(fs.existsSync(tokenFilePath)); // Token file should be deleted after logout

});

test.serial('logout - failure', async (t) => {
	mock.onPost('http://127.0.0.1:9876/ntuaflix_api/logout/?format=json').reply(401, { message: 'Logout failed' });

	await t.throwsAsync(async () => {
		await logout('json');
	}, { instanceOf: Error, message: 'Error: Logout failed' });
});

test.after.always(() => {
	mock.restore();
});
