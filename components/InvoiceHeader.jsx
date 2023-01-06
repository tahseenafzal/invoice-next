import React from "react";

function InvoiceHeader(props) {
  return (
    <div className="invoice-header">
      <img src={props.logoUrl} alt="Company Logo" />
      <h1>{props.companyName}</h1>
      <h2>Invoice #{props.invoiceNumber}</h2>
    </div>
  );
}

export default InvoiceHeader;
