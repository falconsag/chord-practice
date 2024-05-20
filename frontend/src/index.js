import ReactDOM from "react-dom/client";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import App_be from "./App_be";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App_be/>
    </React.StrictMode>
);

