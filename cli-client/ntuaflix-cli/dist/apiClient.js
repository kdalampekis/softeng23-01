import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const BASE_URL = 'http://127.0.0.1:8000/ntuaflix_api'; // Replace with your actual Django server's URL

async function login(username, password) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/ntuaflix_api/login', {
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
  const url = 'http://127.0.0.1:8000/ntuaflix_api/logout';
  try {
    const response = await axios.post(url, {}, {
      headers: {
        'x-observatory-auth': apiKey
      }
    });
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
async function adduser(username) {
  // Implement the 'user' API call here
}
async function user(username) {
  // Implement the 'user' API call here
}
async function healthcheck() {
  // Implement the 'healthcheck' API call here
}
async function resetall() {
  // Implement the 'resetall' API call here
}
async function newtitles(filename) {
  // Implement the 'newtitles' API call here
}
async function newakas(filename) {
  // Implement the 'newakas' API call here
}
async function newnames(filename) {
  // Implement the 'newnames' API call here
}
async function newcrew(filename) {
  // Implement the 'newcrew' API call here
}
async function newepisode(filename) {
  // Implement the 'newepisode' API call here
}
async function newprincipals(filename) {
  // Implement the 'newprincipals' API call here
}
async function newratings(filename) {
  // Implement the 'newratings' API call here
}
async function title(titleID) {
  console.log('Received titleID:', titleID); // Add this line to log the received titleID

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