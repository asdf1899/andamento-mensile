import React from 'react';
import AndamentoMensile from './components/AndamentoMensile.js'
import './App.css';
import './assets/main.css';
import data from './data/data.json'


function App() {
  return (
    <div className="w-full flex content-center my-16 justify-center">
      <AndamentoMensile data={data}/>
    </div>
  );
}

export default App;
