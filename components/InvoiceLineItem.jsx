import React, { useState } from "react";

function InvoiceLineItem({ name, quantity, price, total, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState({ name, quantity, price });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  function handleSave() {
    setIsEditing(false);
    onEdit(item.name, item.quantity, item.price, item.index);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  }

  function handleSearch(event) {
    event.preventDefault();
    setIsSearching(true);
    // Make an API call to search for items matching the query
    // When the results are returned, set the searchResults state with the results
    // and set isSearching back to false
  }

  return (
    <tr>
      {isEditing ? (
        <>
          <td>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={handleChange}
              />
              <button type="submit">Search</button>
              {isSearching ? (
                <p>Loading...</p>
              ) : (
                <ul>
                  {searchResults.map((result) => (
                    <li key={result.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setItem((prevItem) => ({ ...prevItem, ...result }))
                        }
                      >
                        {result.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </td>
          <td>
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              type="number"
              name="price"
              value={item.price}
              onChange={handleChange}
            />
          </td>
          <td>{item.quantity * item.price}</td>
          <td>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{quantity}</td>
          <td>{price}</td>
          <td>{total}</td>
          <td>
            <button type="button" onClick={handleEdit}>
              Edit
            </button>
            <button type="button" onClick={onDelete}>
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
}

export default InvoiceLineItem;
