import React from 'react';

const Table = () => (
      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Product Code </th>
          <th scope="col">Product Description</th>
          <th scope="col">Size</th>
          <th scope="col">Color</th>
          <th scope="col">UOM</th>
          <th scope="col">Qty</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">AJ101</th>
          <td>Chappale </td>
          <td>6x9</td>
          <td>Blue</td>
          <td>Packet</td>
          <td>10.00</td>
        </tr>
      </tbody>
    </table>
);

export default Table;
