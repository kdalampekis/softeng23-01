import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function login(username, password) {
	try {
		const response = await axios.post('http://127.0.0.1:8000/ntuaflix/api/login', {
			username,
			password
		});

		if (response.status === 200) {
			const token = response.data.accessToken;
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

async function logout(apiKey) {
	const url = 'http://127.0.0.1:8000/ntuaflix/api/logout';
	try {
		const response = await axios.post(url, {}, { headers: { 'x-observatory-auth': apiKey } });

		if (response.status === 200) {
			const tokenFilePath = path.join(process.env.HOME, '/softeng20bAPI.token');
			if (fs.existsSync(tokenFilePath)) {
				fs.unlinkSync(tokenFilePath);
			}
			console.log('Logout successful');
		} else {
			console.log('Logout failed');
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}

async function getTitleById(titleId) {
	try {
		const response = await axios.get(`http://127.0.0.1:8000/ntuaflix/api/titles/${titleId}`);
		console.log(response.data);
	} catch (error) {
		console.error('Error fetching title:', error);
	}
}

async function getTitleList() {
	try {
		const response = await axios.get('http://127.0.0.1:8000/ntuaflix/api/title/');
		console.log(response.data);
	} catch (error) {
		console.error('Error fetching title list:', error);
	}
}


export { login, logout, getTitleById, getTitleList };
