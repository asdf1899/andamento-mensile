import React from 'react';
import Table from '../components/Table.js'

function AndamentoMensile() {
  return (
    <div className="shadow-lg p-8">
      <h3 className="text-gray-800 text-xl py-1 mb-4"><b>Andamento Mensile</b></h3>
      <Table className="py-4" />
    </div>
  );
}

export default AndamentoMensile;