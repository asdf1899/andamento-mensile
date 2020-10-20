import React from 'react';
import Table from '../components/Table.js'

function AndamentoMensile() {
  return (
    <div className="shadow-lg p-12 sm:w-auto w-11/12">
      <div className="content-center justify-center">
        <h3 className="text-gray-800 text-xl py-1 mb-4"><b>Andamento Mensile</b></h3>
        <Table />
      </div>
    </div>
  );
}

export default AndamentoMensile;