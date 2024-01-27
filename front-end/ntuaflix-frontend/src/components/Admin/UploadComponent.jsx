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
        setFile(event.target.files[0]);
    };

    // Handle file selection
    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('tsv_file', file);
            let response;

            try {
                if (type === "titlebasics") {
                    response = await axios.post(`${BASE_URL}/titlebasics/`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                else if (type === "titleakas") {
                    response = await axios.post(`${BASE_URL}/titleakas/`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                else if (type === "namebasics") {
                    response = await axios.post(`${BASE_URL}/namebasics/`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                else if (type === "titlecrew") {
                    response = await axios.post(`${BASE_URL}/titlecrew/`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                else if (type === "titleepisode") {
                    response = await axios.post(`${BASE_URL}/titleepisode/`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                else if (type === "titleprincipals") {
                    response = await axios.post(`${BASE_URL}/titleprincipals/`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                else if (type === "titleratings") {
                    response = await axios.post(`${BASE_URL}/titleratings/`, formData, {
                        headers: {
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
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload}>Upload</button>
                </div>
            )}
            <div className="buttonContainer">
                <button onClick={() => navigate(-1)}>Cancel</button>
            </div>
            <Footer role="admin"/>
        </div>
    );
};

export default UploadComponent;