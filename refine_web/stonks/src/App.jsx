import React, { useEffect } from 'react';
import './App.css';
import './tailwind.css';
import { connect } from 'react-redux';

import { getTickerList } from './js/global/actions';

import Sidebar from './components/Sidebar';

function ConnectedApp(props) {
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    props.getTickerList();
  }, []);
  return (
    <div className='App'>
      <Sidebar />
    </div>
  );
}

const App = connect({
  getTickerList,
})(ConnectedApp);

export default App;
