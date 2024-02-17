import React, {useState, useRef} from 'react';
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
    const initial_message = AdminUploadOptions[type];
    const [message, setMessage] = useState(initial_message);
    const [uploadStatus, setUploadStatus] = useState('');
    const [uploaded, setUploaded] = useState(false);

    const fileInputRef = useRef();

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
            fileNameDisplay.textContent = file.name; // Update the display text with the file name
            label.classList.add('file-chosen'); // Add a class to indicate file is selected
        } else {
            setFile(null); // Clear the file in state
            fileNameDisplay.textContent = 'No file chosen...'; // Update the display text
            label.classList.remove('file-chosen'); // Remove class since no file is selected
        }
    };



    // Handle file selection
    const handleUpload = async () => {
        if (file) {
            setUploaded(true);
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

                setUploadStatus('success');
                setMessage("successful!");
                console.log(response.data);
            } catch (error) {
                setUploadStatus('failure');
                setMessage("failed!");
                console.error('Upload failed:', error);
            }
        }
    };

    const handleUploadAgain = () => {
        setMessage(initial_message);
        setUploadStatus('');
        setFile(null);
        setUploaded(false);

        // Reset the file input field
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        // Reset the label classes to default and clear file name display
        const label = document.querySelector('label[for="file-upload"]');
        const fileNameDisplay = document.getElementById('file-name');
        if (label && fileNameDisplay) {
            label.classList.remove('file-selected', 'label-success', 'label-failure');
            fileNameDisplay.textContent = ''; // Reset file name display
        }

    };





    return (
        <div>
            <Header />
            <h1 className="message">Upload {message}</h1>


            {type && (
                <div>
                    <div className="inputContainer fileInputContainer">
                        <label htmlFor="file-upload"
                               className={`custom-file-label ${uploadStatus === 'success' ? 'label-success' : uploadStatus === 'failure' ? 'label-failure' : ''} ${file ? 'file-chosen' : ''}`}>
                            <span id="file-name"></span>
                        </label>
                        <input id="file-upload" type="file" onChange={handleFileChange}
                               className="custom-file-input"
                               ref={fileInputRef}
                        />

                    </div>

                    <div className="buttonContainer">
                        <button onClick={uploaded ? handleUploadAgain : handleUpload}>
                            {uploaded ? "Upload again" : "Upload"}
                        </button>
                        <button onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </div>
            )}

            {/*<Footer role="admin"/>*/}
        </div>
    );
};

export default UploadComponent;