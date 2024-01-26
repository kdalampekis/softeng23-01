import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const BASE_URL = 'http://127.0.0.1:9876/ntuaflix_api';  // Replace with your actual Django server's URL


async function login(username, password) {
	try {
		const response = await axios.post('http://127.0.0.1:9876/ntuaflix_api/login/',new URLSearchParams({
			username,
			password
		}));

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

async function logout() {
	try {
		const __filename = fileURLToPath(import.meta.url);
		const currentDir = path.dirname(__filename);
		const tokenFileName = 'softeng20bAPI.token';
		const tokenFilePath = path.join(currentDir, tokenFileName);

		const token = fs.readFileSync(tokenFilePath, 'utf-8').trim();

		const response = await axios.post(
			'http://127.0.0.1:9876/ntuaflix_api/logout/',
			{},
			{
				headers: {
					'Authorization': `Token ${token}`,
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


async function adduser(username, password) {
	try {
		// Read the token from the saved file
		const homeDirectory = path.dirname(fileURLToPath(import.meta.url));
		const token = fs.readFileSync(`${homeDirectory}/softeng20bAPI.token`, 'utf8').trim();
		console.log(token);
		// Set the API endpoint URL
		const apiUrl = `http://127.0.0.1:9876/ntuaflix_api/admin/usermod/${username}/${password}/`;

		// Create the request headers with the token
		const headers = {
			'Authorization': `${token}`,
			'Content-Type': 'application/json',
		};
		console.log(headers);

		// Make the POST request with the headers
		const response = await axios.post(apiUrl, null, { headers: headers });
		if (response.status === 200) {
			console.log('User added successfully');
		} else {
			console.log('Failed to add user');
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}


async function user(username) {
	try {
		const response = await axios.get(`http://127.0.0.1:9876/ntuaflix_api/admin/users/${username}`);

		if (response.status === 200) {
			console.log(response.data); // Assuming the server sends user details
		} else {
			console.log('User not found');
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}
async function healthcheck() {
	try {
		const response = await axios.get('http://127.0.0.1:9876/ntuaflix_api/admin/healthcheck');

		if (response.status === 200) {
			console.log('Health check passed');
		} else {
			console.log('Health check failed');
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}

async function resetall() {
	try {
		const response = await axios.post('http://127.0.0.1:9876/ntuaflix_api/admin/resetall');

		if (response.status === 200) {
			console.log('Reset all successful');
		} else {
			console.log('Failed to reset all');
		}
	} catch (error) {
		console.error('Error:', error.message);
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

async function newtitles(filename) {
	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);

		const response = await axios.post('http://127.0.0.1:9876/ntuaflix_api/admin/upload/titlebasics/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}



async function newakas(filename) {
	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);

		const response = await axios.post('http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleakas/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}

async function newnames(filename) {
	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);

		const response = await axios.post('http://127.0.0.1:9876/ntuaflix_api/admin/upload/namebasics/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}


async function newcrew(filename) {
	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);

		const response = await axios.post('http://127.0.0.1:9876/ntuaflix_api/admin/upload/titlecrew/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}


async function newepisode(filename) {
	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);

		const response = await axios.post('http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleepisode/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}


async function newprincipals(filename) {
	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);

		const response = await axios.post('http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleprincipals/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}



async function newratings(filename) {
	try {
		const formData = new FormData();

		// Assuming filename is a file path, read the file and append it to FormData
		const file = await readFile(filename);
		formData.append('tsv_file', file, filename);

		const response = await axios.post('http://127.0.0.1:9876/ntuaflix_api/admin/upload/titleratings/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		if (response.status === 200) {
			console.log('API call successful:', response.data);
		} else {
			console.error('API call failed:', response.statusText);
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}



async function title(titleID) {
	console.log('Received titleID:', titleID);  // Add this line to log the received titleID

	const url = `${BASE_URL}/title/${titleID}`;

	try {
		const response = await axios.get(url);

		if (response.status === 200) {
			console.log('Title details:', response.data);
		} else {
			console.log('Failed to fetch title details');
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}

async function searchtitle(titlepart) {
	const url = `${BASE_URL}/searchtitle/?title=${encodeURIComponent(titlepart)}`;

	try {
		const response = await axios.get(url);

		if (response.status === 200) {
			console.log('Search results:', response.data);
		} else {
			console.log('Failed to fetch search results');
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}

async function bygenre(genre, minimumRating, yearFrom = null, yearTo = null) {
	let url = `${BASE_URL}/bygenre/?genre=${encodeURIComponent(genre)}&minimumrating=${minimumRating}`;

	// Append optional parameters if provided
	if (yearFrom !== null) {
		url += `&yearfrom=${yearFrom}`;
	}

	if (yearTo !== null) {
		url += `&yearto=${yearTo}`;
	}

	try {
		const response = await axios.get(url);

		if (response.status === 200) {
			console.log('By Genre results:', response.data);
		} else {
			console.log('Failed to fetch By Genre results');
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}



async function name(nameID) {
	const url = `${BASE_URL}/name/${nameID}`;

	try {
		const response = await axios.get(url);

		if (response.status === 200) {
			console.log('Name Biography:', response.data);
		} else {
			console.log('Failed to fetch Name Biography');
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}

async function searchname(name) {
	const url = `${BASE_URL}/searchname/?name=${encodeURIComponent(name)}`;

	try {
		const response = await axios.get(url);

		if (response.status === 200) {
			console.log('Search Name results:', response.data);
		} else {
			console.log('Failed to fetch Search Name results');
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}



export { login, logout, adduser, user, healthcheck, resetall, newtitles, newakas, newnames, newcrew, newepisode, newprincipals, newratings, title, searchtitle, bygenre, name, searchname };
