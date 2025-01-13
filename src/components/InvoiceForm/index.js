/* import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";

const InvoiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem("invoices");
    return savedInvoices ? JSON.parse(savedInvoices) : [];
  });
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    clientName: "",
    date: "",
    amount: "",
    status: "Pending",
  });

  useEffect(() => {
    if (id) {
      const invoiceToEdit = invoices.find((inv) => inv.id === parseInt(id));
      if (invoiceToEdit) setFormData(invoiceToEdit);
    }
  }, [id, invoices]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      const updatedInvoices = invoices.map((inv) =>
        inv.id === parseInt(id) ? { ...inv, ...formData } : inv
      );
      setInvoices(updatedInvoices);
    } else {
      const newInvoice = { ...formData, id: invoices.length + 1 };
      setInvoices([...invoices, newInvoice]);
    }
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit Invoice" : "Create Invoice"}</h2>
      <input
        name="invoiceNumber"
        placeholder="Invoice Number"
        value={formData.invoiceNumber}
        onChange={handleChange}
        required
      />
      <input
        name="clientName"
        placeholder="Client Name"
        value={formData.clientName}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InvoiceForm; */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    clientName: "",
    date: "",
    amount: "",
    status: "Pending",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    return savedInvoices;
  });

  useEffect(() => {
    if (id) {
      const existingInvoice = invoices.find((inv) => inv.id === parseInt(id));
      if (existingInvoice) {
        setFormData(existingInvoice);
      }
    }
  }, [id, invoices]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      const updatedInvoices = invoices.map((inv) =>
        inv.id === parseInt(id) ? { ...formData, id: parseInt(id) } : inv
      );
      setInvoices(updatedInvoices);
    } else {
      setInvoices([...invoices, { ...formData, id: invoices.length + 1 }]);
    }
    navigate("/home");
  };

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  return (
    <div className="invoice-form">
      <h1>{id ? "Edit Invoice" : "Create Invoice"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Invoice Number:
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Client Name:
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Pending">Pending</option>
          </select>
        </label>
        <button type="submit">
          {id ? "Update Invoice" : "Create Invoice"}
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;
