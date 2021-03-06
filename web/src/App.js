import React, { useEffect } from 'react';
import './App.css';
import './assets/styles/tailwind.css';
import './assets/styles/index.css';
import Dashboard from './dashboard/index';
import Sidebar from './components/Sidebar';
import AdminNavbar from './components/AdminNavbar';
import HeaderStats from './components/HeaderStats';
import FooterAdmin from './components/FooterAdmin';
import { connect } from "react-redux";


import { 
  getStockData,
} from "./js/actions/index";

function ConnectedApp({ getStockData }) {
  useEffect(() => {
    getStockData()
  }, [])
  return (
    <>
      <Sidebar />
      <div></div>
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Dashboard />
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

const App = connect(
  null,
  {
      getStockData,
  }
  )(ConnectedApp);

export default App;
