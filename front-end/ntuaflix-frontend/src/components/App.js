import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './StartPage';
import UserPage from './UserPage';
import AdminPage from "./Admin/AdminPage";
import HealthCheck from "./Admin/HealthCheck";
import AdminUpload from "./Admin/AdminUpload";
import UploadComponent from "./Admin/UploadComponent";
import ResetAll from "./Admin/ResetAll";
import SearchUsers from "./Admin/SearchUsers";
import User from "./Items/User";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/user" element={<UserPage/>} />
                <Route path="/admin" element={<AdminPage/>} />
                <Route path="/admin/healthcheck" element={<HealthCheck />} />
                <Route path="/admin/upload" element={<AdminUpload />} />
                <Route path="/admin/upload/:type" element={<UploadComponent />} />
                <Route path="/admin/resetall" element={<ResetAll />} />
                <Route path="/admin/users" element={<SearchUsers />} />
                <Route path="/admin/users/:username" element={<User />} />
            </Routes>
        </Router>
    );
};

export default App;
