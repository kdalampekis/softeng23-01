import React from "react";
import Header from "./Header";
import "../styles.css"

function LoginPage() {
    return(
        <div>
            <Header />
            <div className={"message"}>Welcome to Ntuaflix</div>
        </div>
    );
}

export default LoginPage;