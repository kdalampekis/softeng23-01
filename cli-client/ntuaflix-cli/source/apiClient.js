import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);
const keyPath =  path.join(currentDir, '..', '..', '..', 'back-end', 'Django', 'ntuaflix', 'localhost+1-key.pem');
const certPath = path.join(currentDir, '..', '..', '..', 'back-end', 'Django', 'ntuaflix', 'localhost+1.pem');


const options = {
	key: fs.readFileSync(keyPath),
	cert: fs.readFileSync(certPath)
  };


const axiosInstance = axios.create({
	httpsAgent: new https.Agent({
	  // This setup is for client-side certificates, which are less commonly required
	  key: fs.readFileSync(keyPath),
	  cert: fs.readFileSync(certPath),
	  // If connecting to a server with a self-signed certificate

	  rejectUnauthorized: false // Set to false only if you want to bypass certificate validation (not recommended)
	}),
	timeout: 900000,
  });

const BASE_URL = 'https://127.0.0.1:9876/ntuaflix_api';  // Replace with your actual Django server's URL


async function login(username, password, format) {
	format = format || 'json'; // If format is not provided, default to 'json'

	try {
		const response = await axiosInstance.post(`https://127.0.0.1:9876/ntuaflix_api/login/`,new URLSearchParams({
			username,
			password
		})
			);

		if (response.status === 200) {
			const token = response.data.token;
			const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
			fs.writeFileSync(`${homeDirectory}/softeng20bAPI.token`, token);
			console.log('Login successful');
		} else {
			console.log('Login failed');
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}

async function logout(format) {
	format = format || 'json'; // If format is not provided, default to 'json'

	try {
		const __filename = fileURLToPath(import.meta.url);
		const currentDir = path.dirname(__filename);
		const tokenFileName = 'softeng20bAPI.token';
		const tokenFilePath = path.join(currentDir, tokenFileName);
		if (!fs.existsSync(tokenFilePath)) {
			console.log('Login required'); // Output a message indicating login is required
			return; // Stop execution if directory doesn't exist
		}
		const token = fs.readFileSync(tokenFilePath, 'utf-8').trim();

		const response = await axiosInstance.post(
			`https://127.0.0.1:9876/ntuaflix_api/logout/?format=${format}`,
			{},
			{
				headers: {
					'Authorization': `${token}`,
				},
			}
		);

		if (response.status === 200) {
			// Delete the token file upon successful logout
			fs.unlinkSync(tokenFilePath);
			console.log('Logout successful');
		} else {
			console.log('Logout failed');
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}


async function adduser(username, password, format ) {
	format = format || 'json'; // If format is not provided, default to 'json'

	try {
		// Read the token from the saved file
		const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
		if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
			console.log('Login required'); // Output a message indicating login is required
			return; // Stop execution if directory doesn't exist
		}
		const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
		// Set the API endpoint URL
		const apiUrl = `https://127.0.0.1:9876/ntuaflix_api/admin/usermod/${username}/${password}/?format=${format}`;

		// Create the request headers with the token
		const headers = {
			'Authorization': `${token}`,
		};
		if (format === 'json') {
			headers['Content-Type'] = 'application/json';
			headers['Accept'] = 'application/json';
		} else if (format === 'csv') {
			headers['Content-Type'] = 'text/csv';
			headers['Accept'] = 'text/csv';
		} else {
			console.error('Invalid format specified:', format);
			return;
		}

		// Make the POST request with the headers
		const response = await axiosInstance.post(apiUrl, null, { headers: headers });
		if (response.status === 200) {
			console.log('User added successfully');
		} else {
			console.log('Failed to add user');
		}
	} catch (error) {
		console.error('Error: Failed to add user');
	}
}


async function user(username, format) {
	format = format || 'json'; // If format is not provided, default to 'json'

	try {
		const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
		if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
			console.log('Login required'); // Output a message indicating login is required
			return; // Stop execution if directory doesn't exist
		}
		const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
		const headers = {
			'Authorization': `${token}`,
		};
		if (format === 'json') {
			headers['Content-Type'] = 'application/json';
			headers['Accept'] = 'application/json';
		} else if (format === 'csv') {
			headers['Content-Type'] = 'text/csv';
			headers['Accept'] = 'text/csv';
		} else {
			console.error('Invalid format specified:', format);
			return;
		}
		const response = await axiosInstance.get(`https://127.0.0.1:9876/ntuaflix_api/admin/users/${username}?format=${format}`,{headers : headers});
		if (response.status === 200) {
			console.log(response.data); // Assuming the server sends user details
		} else {
			console.log('User not found');
		}
	} catch (error) {
		console.error('Error: User not found');
	}
}
async function healthcheck(format ) {
	format = format || 'json'; // If format is not provided, default to 'json'

	try {async function healthcheck(format ) {
		format = format || 'json'; // If format is not provided, default to 'json'

		try {
			const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
			if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
				console.log('Login required'); // Output a message indicating login is required
				return; // Stop execution if directory doesn't exist
			}
			const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
			const headers = {
				'Authorization': `${token}`,
			};
			if (format === 'json') {
				headers['Content-Type'] = 'application/json';
				headers['Accept'] = 'application/json';
			} else if (format === 'csv') {
				headers['Content-Type'] = 'text/csv';
				headers['Accept'] = 'text/csv';
			} else {
				console.error('Invalid format specified:', format);
				return;
			}
			const response = await axiosInstance.post(`https://127.0.0.1:9876/ntuaflix_api/admin/healthcheck?format=${format}`,{}, {headers:headers});

			if (response.status === 200) {
				console.log('Health check passed');
			} else {
				console.log('Health check failed');
			}
		} catch (error) {
			console.error('Error: Health check failed');
		}
	}
		const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
		if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
			console.log('Login required'); // Output a message indicating login is required
			return; // Stop execution if directory doesn't exist
		}
		const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
		const headers = {
			'Authorization': `${token}`,
		};
		if (format === 'json') {
			headers['Content-Type'] = 'application/json';
			headers['Accept'] = 'application/json';
		} else if (format === 'csv') {
			headers['Content-Type'] = 'text/csv';
			headers['Accept'] = 'text/csv';
		} else {
			console.error('Invalid format specified:', format);
			return;
		}
		const response = await axiosInstance.post(`https://127.0.0.1:9876/ntuaflix_api/admin/healthcheck?format=${format}`,{}, {headers:headers});

		if (response.status === 200) {
			console.log('Health check passed');
		} else {
			console.log('Health check failed');
		}
	} catch (error) {
		console.error('Error: Health check failed');
	}
}

async function resetall(format ) {
	format = format || 'json'; // If format is not provided, default to 'json'

	try {
		const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
		if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
			console.log('Login required'); // Output a message indicating login is required
			return; // Stop execution if directory doesn't exist
		}
		const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
		const headers = {
			'Authorization': `${token}`,
		};
		if (format === 'json') {
			headers['Content-Type'] = 'application/json';
			headers['Accept'] = 'application/json';
		} else if (format === 'csv') {
			headers['Content-Type'] = 'text/csv';
			headers['Accept'] = 'text/csv';
		} else {
			console.error('Invalid format specified:', format);
			return;
		}
		const response = await axiosInstance.post(`https://127.0.0.1:9876/ntuaflix_api/admin/resetall/?format=${format}`, {},  {headers:headers});

		if (response.status === 200) {
			console.log('Reset all successful');
		} else {
			console.log('Failed to reset all');
		}
	} catch (error) {
		console.error('Error: Failed to reset all');
	}
}

function readFile(filePath) {
	return new Promise((resolve, reject) => {

		fs.readFile(filePath, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(new Blob([data]));
			}
		});
	});
}

async function newtitles(filename, format ) {
	format = format || 'json'; // If format is not provided, default to 'json'

	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);
		const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
		if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
			console.log('Login required'); // Output a message indicating login is required
			return; // Stop execution if directory doesn't exist
		}
		const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
		const response = await axiosInstance.post(`https://127.0.0.1:9876/ntuaflix_api/admin/upload/titlebasics/`, formData, {
			headers: {
				'Authorization': `${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error: API call failed');
	}
}



async function newakas(filename, format ) {
	format = format || 'json'; // If format is not provided, default to 'json'

	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);
		const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
		if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
			console.log('Login required'); // Output a message indicating login is required
			return; // Stop execution if directory doesn't exist
		}
		const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
		const response = await axiosInstance.post(`https://127.0.0.1:9876/ntuaflix_api/admin/upload/titleakas/?format=${format}`, formData, {
			headers: {
				'Authorization': `${token}`,
				'Content-Type': 'multipart/form-data',
				'Accept': `application/${format}`,
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error: API call failed');
	}
}

async function newnames(filename, format ) {
	format = format || 'json'; // If format is not provided, default to 'json'

	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);
		const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
		if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
			console.log('Login required'); // Output a message indicating login is required
			return; // Stop execution if directory doesn't exist
		}
		const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
		const response = await axiosInstance.post(`https://127.0.0.1:9876/ntuaflix_api/admin/upload/namebasics/?format=${format}`, formData, {
			headers: {
				'Authorization': `${token}`,
				'Content-Type': 'multipart/form-data',
				'Accept': `application/${format}`,
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error: API call failed');
	}
}


async function newcrew(filename, format ) {
	format = format || 'json'; // If format is not provided, default to 'json'

	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);
		const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
		if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
			console.log('Login required'); // Output a message indicating login is required
			return; // Stop execution if directory doesn't exist
		}
		const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
		const response = await axiosInstance.post(`https://127.0.0.1:9876/ntuaflix_api/admin/upload/titlecrew/?format=${format}`, formData, {
			headers: {
				'Authorization': `${token}`,
				'Content-Type': 'multipart/form-data',
				'Accept': `application/${format}`,
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error: API call failed');
	}
}


async function newepisode(filename, format ) {
	format = format || 'json'; // If format is not provided, default to 'json'

	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);
		const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
		if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
			console.log('Login required'); // Output a message indicating login is required
			return; // Stop execution if directory doesn't exist
		}
		const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
		const response = await axiosInstance.post(`https://127.0.0.1:9876/ntuaflix_api/admin/upload/titleepisode/?format=${format}`, formData, {
			headers: {
				'Authorization': `${token}`,
				'Content-Type': 'multipart/form-data',
				'Accept': `application/${format}`,
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error: API call failed');
	}
}


async function newprincipals(filename, format ) {
	format = format || 'json'; // If format is not provided, default to 'json'

	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);
		const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
		if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
			console.log('Login required'); // Output a message indicating login is required
			return; // Stop execution if directory doesn't exist
		}
		const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
		const response = await axiosInstance.post(`https://127.0.0.1:9876/ntuaflix_api/admin/upload/titleprincipals/?format=${format}`, formData, {
			headers: {
				'Authorization': `${token}`,
				'Content-Type': 'multipart/form-data',
				'Accept': `application/${format}`,
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error: API call failed');
	}
}



async function newratings(filename, format ) {
	format = format || 'json'; // If format is not provided, default to 'json'

	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);
		const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
		if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
			console.log('Login required'); // Output a message indicating login is required
			return; // Stop execution if directory doesn't exist
		}
		const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();

		const response = await axiosInstance.post(`https://127.0.0.1:9876/ntuaflix_api/admin/upload/titleratings/?format=${format}`, formData, {
			headers: {
				'Authorization': `${token}`,
				'Content-Type': 'multipart/form-data'
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error: API call failed');
	}
}



async function title(titleID, format) {
	format = format || 'json'; // If format is not provided, default to 'json'
	const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
	if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
		console.log('Login required'); // Output a message indicating login is required
		return; // Stop execution if directory doesn't exist
	}
	const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
	const headers = {
		'Authorization': `${token}`,
	};
	if (format === 'json') {
		headers['Content-Type'] = 'application/json';
		headers['Accept'] = 'application/json';
	} else if (format === 'csv') {
		headers['Content-Type'] = 'text/csv';
		headers['Accept'] = 'text/csv';
	} else {
		console.error('Invalid format specified:', format);
		return;
	}
	const url = `${BASE_URL}/title/${titleID}?format=${format}`;

	try {
		const response = await axiosInstance.get(url,{headers:headers});

		if (response.status === 200) {
			console.log('Title details:', response.data);
		} else {
			console.log('Failed to fetch title details');
		}
	} catch (error) {
		console.error('Error: Failed to fetch title details');
	}
}

async function searchtitle(titlepart, format ) {
	format = format || 'json'; // If format is not provided, default to 'json'
	const url = `${BASE_URL}/searchtitle/?title=${encodeURIComponent(titlepart)}&?format=${format}`;
	const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
	if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
		console.log('Login required'); // Output a message indicating login is required
		return; // Stop execution if directory doesn't exist
	}
	const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
	const headers = {
		'Authorization': `${token}`,
	};
	if (format === 'json') {
		headers['Content-Type'] = 'application/json';
		headers['Accept'] = 'application/json';
	} else if (format === 'csv') {
		headers['Content-Type'] = 'text/csv';
		headers['Accept'] = 'text/csv';
	} else {
		console.error('Invalid format specified:', format);
		return;
	}
	try {
		const response = await axiosInstance.get(url,{headers:headers});

		if (response.status === 200) {
			console.log('Search results:', response.data);
		} else {
			console.log('Failed to fetch search results');
		}
	} catch (error) {
		console.error('Error: Failed to fetch search results');
	}
}

async function bygenre(genre, minimumRating, yearFrom = null, yearTo = null, format ) {
	format = format || 'json'; // If format is not provided, default to 'json'
	let url = `${BASE_URL}/bygenre/?genre=${encodeURIComponent(genre)}&minimumrating=${minimumRating}`;
	const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
	if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
		console.log('Login required'); // Output a message indicating login is required
		return; // Stop execution if directory doesn't exist
	}
	const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
	const headers = {
		'Authorization': `${token}`,
	};

	// Append optional parameters if provided
	if (yearFrom !== null) {
		url += `&yearfrom=${yearFrom}`;
	}

	if (yearTo !== null) {
		url += `&yearto=${yearTo}`;
	}

	if (format === 'json') {
		headers['Content-Type'] = 'application/json';
		headers['Accept'] = 'application/json';
	} else if (format === 'csv') {
		headers['Content-Type'] = 'text/csv';
		headers['Accept'] = 'text/csv';
	} else {
		console.error('Invalid format specified:', format);
		return;
	}
	url += `&?format=${format}`;
	try {
		const response = await axiosInstance.get(url,{headers:headers});

		if (response.status === 200) {
			console.log('By Genre results:', response.data);
		} else {
			console.log('Failed to fetch By Genre results');
		}
	} catch (error) {
		console.error('Error: Failed to fetch By Genre results');
	}
}



async function name(nameID, format) {
	format = format || 'json'; // If format is not provided, default to 'json'
	let url = `${BASE_URL}/name/${nameID}?format=${format}`;
	const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
	if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
		console.log('Login required'); // Output a message indicating login is required
		return; // Stop execution if directory doesn't exist
	}
	const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
	const headers = {
		'Authorization': `${token}`,
	};
	if (format === 'json') {
		headers['Content-Type'] = 'application/json';
		headers['Accept'] = 'application/json';
	} else if (format === 'csv') {
		headers['Content-Type'] = 'text/csv';
		headers['Accept'] = 'text/csv';
	} else {
		console.error('Invalid format specified:', format);
		return;
	}
	try {
		const response = await axiosInstance.get(url,{headers:headers});

		if (response.status === 200) {
			console.log('Name Biography:', response.data);
		} else {
			console.log('Failed to fetch Name Biography');
		}
	} catch (error) {
		console.error('Error: Failed to fetch Name Biography: Actor/actress not found', );
	}
}

async function searchname(name, format) {
	format = format || 'json'; // If format is not provided, default to 'json'
	let url = `${BASE_URL}/searchname/?name=${encodeURIComponent(name)}&?format=${format}`;
	const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
	if (!fs.existsSync(`${homeDirectory}/softeng20bAPI.token`)) {
		console.log('Login required'); // Output a message indicating login is required
		return; // Stop execution if directory doesn't exist
	}
	const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
	const headers = {
		'Authorization': `${token}`,
	};
	if (format === 'json') {
		headers['Content-Type'] = 'application/json';
		headers['Accept'] = 'application/json';
	} else if (format === 'csv') {
		headers['Content-Type'] = 'text/csv';
		headers['Accept'] = 'text/csv';
	} else {
		console.error('Invalid format specified:', format);
		return;
	}
	try {
		const response = await axiosInstance.get(url,{headers:headers});

		if (response.status === 200) {
			console.log('Search Name results:', response.data);
		} else {
			console.log('Failed to fetch Search Name results');
		}
	} catch (error) {
		console.error('Error: Failed to fetch Search Name results: No results found');
	}
}



export { login, logout, adduser, user, healthcheck, resetall, newtitles, newakas, newnames, newcrew, newepisode, newprincipals, newratings, title, searchtitle, bygenre, name, searchname };
