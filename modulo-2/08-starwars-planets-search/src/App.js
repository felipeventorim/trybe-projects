import React from 'react';
import './App.css';

import MyProvider from './context/MyProvider';

import Table from './components/Table';
import Filters from './components/Filters';
import Header from './components/Header';

function App() {
  return (
    <MyProvider>
      <Header />
      <Filters />
      <Table />
    </MyProvider>
  );
}

export default App;
