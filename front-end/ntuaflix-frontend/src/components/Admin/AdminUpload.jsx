import React, {useState} from "react";
import {AdminUploadOptions} from "../../constants/AdminOptions";
import Header from "../Header";
import Footer from "../Footer";
import {useNavigate} from "react-router-dom";

export default function AdminUpload() {
    const [selectedFunctionality, setSelectedFunctionality] = useState(null);
    const navigate = useNavigate();

    const handleFunctionalityClick = (option) => {
        setSelectedFunctionality(option);

        const type = option.toLowerCase().replace(/\s+/g, '');
        navigate(`/admin/upload/${type}`);
    }

    return (
        <div>
            <Header/>
            <h1 className={`message home`}>What do you want to upload?</h1>
            {!selectedFunctionality && (
                <div className="functionalitiesContainer">
                    {Object.values(AdminUploadOptions).map((option, index) => (
                        <button
                            key={index}
                            className="functionality"
                            onClick={() => handleFunctionalityClick(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}

            <Footer role="admin"/>
        </div>
    );
}