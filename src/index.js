import React, { useState, useEffect, Suspense } from "react";
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
