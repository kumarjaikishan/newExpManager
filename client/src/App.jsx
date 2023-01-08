import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import loadere from '../src/img/loader.png'
import Sidebar from './components/sidebar/sidebar';
import Home from './pages/home';
import Addexp from './pages/addexp/addexp';
import Datanalysis from './pages/dataanalysis';
import { useState } from 'react';
import Login from './pages/login/login';
import Logout from './pages/logout';
import Report from './pages/Report';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [leddetail, setleddetail] = useState([]);
  const [expenselist, setexpenselist] = useState([]);
  const [login, setlogin] = useState(false);
  const [loader, setloader] = useState(false);
  const [narrow, setnarrow] = useState(false);
  const [heade, setheade] = useState("LogIn")

  const notification = {
    success: (msg, dur) => {
      toast.success(msg, {
        autoClose: dur,
      });
    },
    warn: (msg, dur) => {
      toast.warning(msg, {
        autoClose: dur,
      });
    }
  }

  return (
    <>
      <ToastContainer />

      <div className="App">
        <Navbar login={login} narrow={narrow} heade={heade} setnarrow={setnarrow} />
        <div className={narrow ? "main narrow" : "main"}>
          <Routes>
            <Route path="/" element={<Home login={login} expenselist={expenselist} setheade={setheade} setloader={setloader} />} />
            <Route path="/addexpense" element={<Addexp notification={notification} setexpenselist={setexpenselist} expenselist={expenselist} login={login} setleddetail={setleddetail} leddetail={leddetail} setloader={setloader} />} />
            <Route path="/datanalysis" element={<Datanalysis leddetail={leddetail} expenselist={expenselist} login={login} setloader={setloader} />} />
            <Route path="/report" element={<Report expenselist={expenselist} leddetail={leddetail} login={login} setloader={setloader} />} />
            <Route path="/login" element={<Login setexpenselist={setexpenselist} setleddetail={setleddetail} setlogin={setlogin} setloader={setloader} notification={notification} />} />
            <Route path="/logout" element={<Logout setleddetail={setleddetail} setlogin={setlogin} />} />
          </Routes>
          <div style={{ display: loader ? "flex" : "none" }} className="loader"><img src={loadere} alt="" /></div>
        </div>
        <Sidebar login={login} narrow={narrow} setheade={setheade} />
      </div>
    </>
  );
}

export default App;
