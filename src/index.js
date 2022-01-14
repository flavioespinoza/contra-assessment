import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import UserProfileList from './UserProfileList';

function App() {
  return (<UserProfileList />)
}

const rootElement = document.getElementById(
  "root"
);
ReactDOM.createRoot(rootElement).render(<App />);
