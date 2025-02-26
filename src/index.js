import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Wrap with PersistGate */}
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
