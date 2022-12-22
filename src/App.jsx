import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Sidebar from './components/sidebar/sidebar';
import Home from './pages/home';
import Addexp from './pages/addexp';
import Datanalysis from './pages/dataanalysis';
import { useState } from 'react';

function App() {
  const [narrow,setnarrow]=useState(false);
  return (
    <div className="App">
      <Navbar narrow={narrow} setnarrow={setnarrow} />
      <div className={narrow ? "main narrow":"main"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addexpense" element={<Addexp />} />
          <Route path="/datanalysis" element={<Datanalysis />} />
        </Routes>
      </div>
      <Sidebar narrow={narrow} />
    </div>
  );
}

export default App;
