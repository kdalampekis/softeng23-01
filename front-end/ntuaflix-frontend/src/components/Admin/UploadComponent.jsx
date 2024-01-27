import React, {useState} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import "../../styles.css";
import {useNavigate, useParams} from "react-router-dom";
import {AdminUploadOptions} from "../../constants/AdminOptions";
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:9876/ntuaflix_api/admin/upload';

const UploadComponent = () => {
    const navigate = useNavigate();
    const { type } = useParams();
    const message = AdminUploadOptions[type];

    const [file, setFile] = useState(null); // state to store the selected file


    // Handle file selection
    const handleFileChange = (event) => {
        const fileInput = event.target;
        const fileNameDisplay = document.getElementById('file-name');

        // If a file is selected
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            setFile(file); // Update the state with the selected file
            const fileName = file.name;
            fileNameDisplay.textContent = fileName; // Display the file name
            label.classList.remove('no-file-selected'); // Remove the class indicating no file is selected
        } else {
            setFile(null); // Update the state to no file
            fileNameDisplay.textContent = 'No file chosen...'; // Reset the display text
            label.classList.add('no-file-selected'); // Add the class indicating no file is selected
        }
    };


    // Handle file selection
    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('tsv_file', file);
            let response;
            const token = localStorage.getItem('softeng20bAPI.token');
            // Set up the headers with the auth token

            try {
                if (type === "titlebasics") {
                    response = await axios.post(`${BASE_URL}/titlebasics/`, formData, {
                        headers: {
                            'Authorization': `${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                else if (type === "titleakas") {
                    response = await axios.post(`${BASE_URL}/titleakas/`, formData, {
                        headers: {
                            'Authorization': `${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                else if (type === "namebasics") {
                    response = await axios.post(`${BASE_URL}/namebasics/`, formData, {
                        headers: {
                            'Authorization': `${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                else if (type === "titlecrew") {
                    response = await axios.post(`${BASE_URL}/titlecrew/`, formData, {
                        headers: {
                            'Authorization': `${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                else if (type === "titleepisode") {
                    response = await axios.post(`${BASE_URL}/titleepisode/`, formData, {
                        headers: {
                            'Authorization': `${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                else if (type === "titleprincipals") {
                    response = await axios.post(`${BASE_URL}/titleprincipals/`, formData, {
                        headers: {
                            'Authorization': `${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                else if (type === "titleratings") {
                    response = await axios.post(`${BASE_URL}/titleratings/`, formData, {
                        headers: {
                            'Authorization': `${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }


                alert('Upload successful!');
                console.log(response.data);
            } catch (error) {
                console.error('Upload failed:', error);
                alert('Upload failed!');
            }
        }
    };



    return (
        <div>
            <Header />
            <h1 className="message">Upload {message}</h1>
            {type && (
                <div>
                    <div className="inputContainer fileInputContainer">
                        <label htmlFor="file-upload" className="custom-file-label">
                            <span>Choose file... </span>
                            <span id="file-name"></span>
                        </label>
                        <input id="file-upload" type="file" onChange={handleFileChange}
                               className="custom-file-input no-file-selected"/>

                    </div>


                    <div className="buttonContainer">
                        <button onClick={handleUpload}>Upload</button>
                        <button onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </div>
            )}
            <Footer role="admin"/>
        </div>
    );
};

export default UploadComponent;