import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import "./index.css";
import "/src/index.css";
//import App from "./App.jsx";
import App from "/src/App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'; // Import Provider
import store from '/redux/store'; // Adjust the path to your store

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap App with Provider */}
    <BrowserRouter>

        <App />

    </BrowserRouter>
    </Provider>
  </StrictMode>
);