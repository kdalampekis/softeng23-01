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
        const label = document.querySelector('label[for="file-upload"]');
        const fileNameDisplay = document.getElementById('file-name');

        // Check if a file is selected
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            setFile(file); // Set the file in state
            const fileName = file.name;
            fileNameDisplay.textContent = fileName; // Update the display text with the file name
            label.classList.add('file-has-selected'); // Add a class to indicate file is selected
            label.classList.remove('no-file-selected'); // Remove the class from the label
        } else {
            setFile(null); // Clear the file in state
            fileNameDisplay.textContent = 'No file chosen...'; // Update the display text
            label.classList.remove('file-has-selected'); // Remove class since no file is selected
            label.classList.add('no-file-selected'); // Add the class to the label
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
                        <label htmlFor="file-upload" className="custom-file-label no-file-selected">
                            <span id="file-name"></span>
                        </label>
                        <input id="file-upload" type="file" onChange={handleFileChange}
                               className="custom-file-input"/>

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