import React, { useState } from "react";
import AddItemForm from "../components/AddItemForm";
import InvoiceFooter from "../components/InvoiceFooter";
import InvoiceHeader from "../components/InvoiceHeader";
import InvoiceLineItem from "../components/InvoiceLineItem";

function InvoiceScreen() {
  // State for the invoice data
  const [invoice, setInvoice] = useState({
    companyName: "Acme Co.",
    logoUrl: "https://example.com/logo.png",
    invoiceNumber: "12345",
    items: [
      { name: "Widget", quantity: 2, price: 9.99 },
      { name: "Gadget", quantity: 1, price: 19.99 },
    ],
    dueDate: "01/01/2023",
  });

  // Calculate the total cost of the invoice
  const total = invoice.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  function addItem(name, quantity, price) {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      items: [...prevInvoice.items, { name, quantity, price }],
    }));
  }

  function updateItem(index, name, quantity, price) {
    setInvoice((prevInvoice) => {
      const items = [...prevInvoice.items];
      items[index] = { name, quantity, price };
      return {
        ...prevInvoice,
        items,
      };
    });
  }

  function deleteItem(index) {
    setInvoice((prevInvoice) => {
      const items = [...prevInvoice.items];
      items.splice(index, 1);
      return {
        ...prevInvoice,
        items,
      };
    });
  }

  return (
    <div className="invoice-screen">
      <InvoiceHeader
        companyName={invoice.companyName}
        logoUrl={invoice.logoUrl}
        invoiceNumber={invoice.invoiceNumber}
      />
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <InvoiceLineItem
              key={index}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              total={item.quantity * item.price}
              onEdit={(name, quantity, price, index) =>
                updateItem(index, name, quantity, price)
              }
              onDelete={() => deleteItem(index)}
            />
          ))}
        </tbody>
      </table>
      <InvoiceFooter total={total} dueDate={invoice.dueDate} />
      <AddItemForm onSubmit={addItem} />
    </div>
  );
}

export default InvoiceScreen;
