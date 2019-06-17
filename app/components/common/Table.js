import React from 'react';

type Props = {
  productList: Array
};

const Table = (props: Props) => {
  // 1. Destructure props product list
  const { productList } = props;
  return (
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
          {productList.map(item => (
                <tr  key={item.productCode}>
                  <th scope="row">{item.productCode}</th>
                  <td>{item.productDescription}</td>
                  <td>{item.productSize}</td>
                  <td>{item.productColor}</td>
                  <td>{item.productUOM}</td>
                  <td>{item.currentStock}</td>
              </tr>
            ))}

        </tbody>
      </table>
  );

};

export default Table;
