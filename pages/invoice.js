import React, { useState } from "react";
import Link from "next/link";

const Invoice = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    setItems([
      ...items,
      {
        name: event.target.itemName.value,
        price: event.target.itemPrice.value,
      },
    ]);
    event.target.itemName.value = "";
    event.target.itemPrice.value = "";
  };

  const handleRemove = (name) => {
    setItems(items.filter((item) => item.name !== name));
  };

  return (
    <>
      <h1>Invoice</h1>
      <form onSubmit={handleAdd}>
        <label htmlFor="itemName">Item Name:</label>
        <br />
        <input type="text" id="itemName" name="itemName" />
        <br />
        <label htmlFor="itemPrice">Item Price:</label>
        <br />
        <input type="text" id="itemPrice" name="itemPrice" />
        <br />
        <button type="submit">Add Item</button>
      </form>
      <form>
        <label htmlFor="search">Search:</label>
        <br />
        <input type="text" id="search" name="search" onChange={handleSearch} />
        <br />
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button type="button">Edit</button>
                </td>

                <td>
                  <button type="button" onClick={() => handleRemove(item.name)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link href="/">Home</Link>
    </>
  );
};

export default Invoice;
