import React, { useState, useEffect } from "react";

function AddItemForm(props) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function searchItems() {
      // Make a request to the server to search for items
      const response = await fetch(`/api/items?name=${name}`);
      const results = await response.json();
      setSearchResults(results);
    }

    if (name) {
      searchItems();
    }
  }, [name]);

  function handleSubmit(event) {
    event.preventDefault();
    props.addItem(name, quantity, price);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br />
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((item, index) => (
            <li
              key={index}
              onClick={() =>
                props.addItem(item.name, item.quantity, item.price)
              }
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;
