import test from 'ava';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import fs from 'fs';
import { login, logout, adduser, user, healthcheck, resetall, newtitles, newakas, newnames, newcrew, newepisode, newprincipals, newratings, title, searchtitle, bygenre, name, searchname } from '../source/apiClient';
import path from "path";
import {fileURLToPath} from "url";

const mock = new MockAdapter(axios);

// Helper function to set up the token file for testing
function setupTokenFile() {
	const dir = path.dirname(fileURLToPath(import.meta.url));
	const tokenFilePath = `${dir}/softeng20bAPI.token`;
	const tokenContent = 'test-token';
	fs.writeFileSync(tokenFilePath, tokenContent);
	return tokenFilePath;
}

// Helper function to clean up the token file after testing
function cleanupTokenFile(tokenFilePath) {
	fs.unlinkSync(tokenFilePath);
}

// Test login function
test('login - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const expectedToken = 'test-token';
	const username = 'testuser';
	const password = 'testpassword';

	mock.onPost('http://127.0.0.1:9876/ntuaflix_api/login/?format=json', {
		username,
		password,
	}).reply(200, { token: expectedToken });

	await login(username, password, 'json');

	const actualToken = fs.readFileSync(tokenFilePath, 'utf-8').trim();
	t.is(actualToken, expectedToken);

	cleanupTokenFile(tokenFilePath);
});

test('login - failure', async (t) => {
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

test('logout - success', async (t) => {
	const tokenFilePath = setupTokenFile();

	mock.onPost('http://127.0.0.1:9876/ntuaflix_api/logout/?format=json').reply(200);

	await logout('json');

	t.false(fs.existsSync(tokenFilePath)); // Token file should be deleted after logout

	cleanupTokenFile(tokenFilePath);
});

test('logout - failure', async (t) => {
	mock.onPost('http://127.0.0.1:9876/ntuaflix_api/logout/?format=json').reply(401, { message: 'Logout failed' });

	await t.throwsAsync(async () => {
		await logout('json');
	}, { instanceOf: Error, message: 'Error: Logout failed' });
});

test('adduser - success', async (t) => {
	const tokenFilePath = setupTokenFile();

	const username = 'testuser';
	const password = 'testpassword';

	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/usermod/${username}/${password}/?format=json`).reply(200, { message: 'User added successfully' });

	await adduser(username, password, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.post;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/usermod/${username}/${password}/?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	cleanupTokenFile(tokenFilePath);
});

test('adduser - failure', async (t) => {
	const username = 'testuser';
	const password = 'testpassword';

	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/usermod/${username}/${password}/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await adduser(username, password, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to add user' });
});

test('user - success', async (t) => {
	const tokenFilePath = setupTokenFile();

	const username = 'testuser';
	const userDetails = { id: 123, username: 'testuser', email: 'testuser@example.com' };

	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/admin/users/${username}?format=json`).reply(200, userDetails);

	await user(username, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/users/${username}?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	cleanupTokenFile(tokenFilePath);
});

test('user - user not found', async (t) => {
	const username = 'nonexistentuser';

	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/admin/users/${username}?format=json`).reply(404);

	await t.throwsAsync(async () => {
		await user(username, 'json');
	}, { instanceOf: Error, message: 'Error: User not found' });
});

test('user - failure', async (t) => {
	const username = 'testuser';

	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/admin/users/${username}?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await user(username, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to fetch user details' });
});

test('healthcheck - success', async (t) => {
	const tokenFilePath = setupTokenFile();

	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/admin/healthcheck/?format=json`).reply(200);

	await healthcheck('json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/healthcheck/?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	cleanupTokenFile(tokenFilePath);
});

test('healthcheck - failure', async (t) => {
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/admin/healthcheck/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await healthcheck('json');
	}, { instanceOf: Error, message: 'Error: Health check failed' });
});

test('resetall - success', async (t) => {
	const tokenFilePath = setupTokenFile();

	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/resetall/?format=json`).reply(200);

	await resetall('json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.post;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/resetall/?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	cleanupTokenFile(tokenFilePath);
});

test('resetall - failure', async (t) => {
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/resetall/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await resetall('json');
	}, { instanceOf: Error, message: 'Error: Failed to reset all' });
});

test('newtitles - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.basics.tsv';

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

	cleanupTokenFile(tokenFilePath);
});

test('newtitles - failure', async (t) => {
	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.basics.tsv';

	// Mock the POST request and provide an error response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titlebasics/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newtitles(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test('newakas - success', async (t) => {
	const tokenFilePath = setupTokenFile();

	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.akas.tsv';
	const formData = new FormData();
	formData.append('tsv_file', 'contents', filename);

	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleakas/?format=json`).reply(200, { message: 'Upload successful' });

	await newakas(filename, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.post;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleakas/?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	cleanupTokenFile(tokenFilePath);
});

test('newakas - failure', async (t) => {
	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.akas.tsv';
	const formData = new FormData();
	formData.append('tsv_file', 'contents', filename);

	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleakas/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newakas(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test('newnames - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.akas.tsv';

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

	cleanupTokenFile(tokenFilePath);
});

test('newnames - failure', async (t) => {
	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.akas.tsv';

	// Mock the POST request and provide an error response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/namebasics/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newnames(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test('newcrew - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.crew.tsv';

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

	cleanupTokenFile(tokenFilePath);
});

test('newcrew - failure', async (t) => {
	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.crew.tsv';

	// Mock the POST request and provide an error response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titlecrew/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newcrew(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test('newepisode - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.episode.tsv';

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

	cleanupTokenFile(tokenFilePath);
});

test('newepisode - failure', async (t) => {
	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.episode.tsv';

	// Mock the POST request and provide an error response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleepisode/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newepisode(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test('newprincipals - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.principals.tsv';

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

	cleanupTokenFile(tokenFilePath);
});

test('newprincipals - failure', async (t) => {
	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.principals.tsv';

	// Mock the POST request and provide an error response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleprincipals/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newprincipals(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test('newratings - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.ratings.tsv';

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

	cleanupTokenFile(tokenFilePath);
});

test('newratings - failure', async (t) => {
	const filename = 'C:\\Users\\kostas bekis\\WebstormProjects\\softeng23-01\\back-end\\Database\\Data\\truncated_title.ratings.tsv';

	// Mock the POST request and provide an error response
	mock.onPost(`http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleratings/?format=json`).reply(500, { message: 'Internal Server Error' });

	await t.throwsAsync(async () => {
		await newratings(filename, 'json');
	}, { instanceOf: Error, message: 'Error: API call failed: Internal Server Error' });
});

test('title - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const titleID = '123';

	// Mock the GET request and provide a successful response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/title/${titleID}?format=json`).reply(200, { title: 'Example Title' });

	await title(titleID, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/title/${titleID}?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	// Assert the response data
	const responseData = config.data;
	t.deepEqual(responseData, { title: 'Example Title' });

	cleanupTokenFile(tokenFilePath);
});

test('title - failure', async (t) => {
	const titleID = '456';

	// Mock the GET request and provide an error response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/title/${titleID}?format=json`).reply(404, { message: 'Title not found' });

	await t.throwsAsync(async () => {
		await title(titleID, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to fetch title details: Title not found' });
});

test('searchtitle - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const titlePart = 'example';

	// Mock the GET request and provide a successful response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/searchtitle/?title=${encodeURIComponent(titlePart)}&format=json`).reply(200, { results: ['Example Title 1', 'Example Title 2'] });

	await searchtitle(titlePart, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/searchtitle/?title=${encodeURIComponent(titlePart)}&format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	// Assert the response data
	const responseData = config.data;
	t.deepEqual(responseData, { results: ['Example Title 1', 'Example Title 2'] });

	cleanupTokenFile(tokenFilePath);
});

test('searchtitle - failure', async (t) => {
	const titlePart = 'nonexistent';

	// Mock the GET request and provide an error response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/searchtitle/?title=${encodeURIComponent(titlePart)}&format=json`).reply(404, { message: 'No matching titles found' });

	await t.throwsAsync(async () => {
		await searchtitle(titlePart, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to fetch search results: No matching titles found' });
});

test('bygenre - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const genre = 'Action';
	const minimumRating = 7.5;

	// Mock the GET request and provide a successful response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/bygenre/?genre=${encodeURIComponent(genre)}&minimumrating=${minimumRating}&format=json`).reply(200, { results: ['Movie 1', 'Movie 2'] });

	await bygenre(genre, minimumRating, null, null, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/bygenre/?genre=${encodeURIComponent(genre)}&minimumrating=${minimumRating}&format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	// Assert the response data
	const responseData = config.data;
	t.deepEqual(responseData, { results: ['Movie 1', 'Movie 2'] });

	cleanupTokenFile(tokenFilePath);
});

test('bygenre - with optional parameters', async (t) => {
	const tokenFilePath = setupTokenFile();
	const genre = 'Drama';
	const minimumRating = 8.0;
	const yearFrom = 2010;
	const yearTo = 2020;

	// Mock the GET request and provide a successful response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/bygenre/?genre=${encodeURIComponent(genre)}&minimumrating=${minimumRating}&yearfrom=${yearFrom}&yearto=${yearTo}&format=json`).reply(200, { results: ['Drama Movie 1', 'Drama Movie 2'] });

	await bygenre(genre, minimumRating, yearFrom, yearTo, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/bygenre/?genre=${encodeURIComponent(genre)}&minimumrating=${minimumRating}&yearfrom=${yearFrom}&yearto=${yearTo}&format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	// Assert the response data
	const responseData = config.data;
	t.deepEqual(responseData, { results: ['Drama Movie 1', 'Drama Movie 2'] });

	cleanupTokenFile(tokenFilePath);
});

test('bygenre - failure', async (t) => {
	const genre = 'Nonexistent';
	const minimumRating = 7.0;

	// Mock the GET request and provide an error response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/bygenre/?genre=${encodeURIComponent(genre)}&minimumrating=${minimumRating}&format=json`).reply(404, { message: 'No matching movies found' });

	await t.throwsAsync(async () => {
		await bygenre(genre, minimumRating, null, null, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to fetch By Genre results: No matching movies found' });
});

test('name - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const nameID = 'nm1234567';

	// Mock the GET request and provide a successful response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/name/${nameID}?format=json`).reply(200, { biography: 'This is a biography of the actor/actress.' });

	await name(nameID, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/name/${nameID}?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	// Assert the response data
	const responseData = config.data;
	t.deepEqual(responseData, { biography: 'This is a biography of the actor/actress.' });

	cleanupTokenFile(tokenFilePath);
});

test('name - failure', async (t) => {
	const nameID = 'nonexistent';

	// Mock the GET request and provide an error response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/name/${nameID}?format=json`).reply(404, { message: 'Actor/actress not found' });

	await t.throwsAsync(async () => {
		await name(nameID, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to fetch Name Biography: Actor/actress not found' });
});

test('searchname - success', async (t) => {
	const tokenFilePath = setupTokenFile();
	const name = 'John Doe';

	// Mock the GET request and provide a successful response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/searchname/?name=${encodeURIComponent(name)}?format=json`).reply(200, [
		{ id: 'nm1234567', name: 'John Doe' },
		{ id: 'nm7654321', name: 'Johnathan Doe' },
	]);

	await searchname(name, 'json');

	// Assert that the API call was made with the correct parameters
	const [config] = mock.history.get;
	t.is(config.url, `http://127.0.0.1:9876/ntuaflix_api/searchname/?name=${encodeURIComponent(name)}?format=json`);
	t.true(config.headers['Authorization'].startsWith('Bearer '));

	// Assert the response data
	const responseData = config.data;
	t.deepEqual(responseData, [
		{ id: 'nm1234567', name: 'John Doe' },
		{ id: 'nm7654321', name: 'Johnathan Doe' },
	]);

	cleanupTokenFile(tokenFilePath);
});

test('searchname - failure', async (t) => {
	const name = 'Nonexistent Actor';

	// Mock the GET request and provide an error response
	mock.onGet(`http://127.0.0.1:9876/ntuaflix_api/searchname/?name=${encodeURIComponent(name)}?format=json`).reply(404, { message: 'No results found' });

	await t.throwsAsync(async () => {
		await searchname(name, 'json');
	}, { instanceOf: Error, message: 'Error: Failed to fetch Search Name results: No results found' });
});

test.after.always(() => {
	mock.restore();
});
