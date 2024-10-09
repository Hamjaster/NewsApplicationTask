import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home";
function App() {
  return (
    <div className="relative">
      <div className="absolute text-gray-400 bottom-5 right-5">
        Developed by Hamza
      </div>
      <Home />
    </div>
  );
}

export default App;
