import React from "react";

function InvoiceFooter(props) {
  return (
    <div className="invoice-footer">
      <div>Total: ${props.total}</div>
      <div>Payment Due: {props.dueDate}</div>
    </div>
  );
}

export default InvoiceFooter;
