import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "@mui/material";
import "./GSTScreens.css";

const SalesInvoice = () => {
  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    address: "",
    contactPerson: "",
    phoneNo: "",
    gstNumber: "",
    placeOfSupply: "Telangana",
    pinCode: "",
    city: "",
    state: "",
    billingAddress: "",
  });

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceType: "",
    invoiceNo: "",
    date: "",
    deliveryMode: "",
    deliveryDate: "",
  });

  const [productItems, setProductItems] = useState([
    { productName: "", hsn: "", qty: "", uom: "", price: "", discount: "", gst: "" },
  ]);

  const [totals, setTotals] = useState({
    totalTaxable: 0,
    totalTax: 0,
    grandTotal: 0,
  });

  const handleAddRow = () => {
    setProductItems([
      ...productItems,
      { productName: "", hsn: "", qty: "", uom: "", price: "", discount: "", gst: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updatedItems = productItems.filter((_, i) => i !== index);
    setProductItems(updatedItems);
  };

  const handleProductChange = (index, field, value) => {
    const updatedItems = productItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setProductItems(updatedItems);
    calculateTotals(updatedItems);
  };

  const calculateTotals = (items) => {
    let totalTaxable = 0;
    let totalTax = 0;

    items.forEach((item) => {
      const taxableValue = item.qty * item.price - item.discount;
      const tax = (taxableValue * item.gst) / 100;
      totalTaxable += taxableValue;
      totalTax += tax;
    });

    setTotals({
      totalTaxable,
      totalTax,
      grandTotal: totalTaxable + totalTax,
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title Section
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFont("helvetica", "bold");
    doc.text("Sales Invoice", 105, 15, null, null, "center");

    // Customer Information
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Customer Information", 14, 45);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(`Name: ${customerInfo.customerName || "N/A"}`, 14, 50);
    doc.text(`Address: ${customerInfo.address || "N/A"}`, 14, 55);
    doc.text(`Contact: ${customerInfo.contactPerson || "N/A"}`, 14, 60);
    doc.text(`Phone: ${customerInfo.phoneNo || "N/A"}`, 14, 65);
    doc.text(`GSTIN: ${customerInfo.gstNumber || "N/A"}`, 14, 70);

    // Billing Address
    doc.setFont("helvetica", "bold");
    doc.text("Billing Address", 105, 45);
    doc.setFont("helvetica", "normal");
    doc.text(`City: ${customerInfo.city || "N/A"}`, 105, 50);
    doc.text(`State: ${customerInfo.state || "N/A"}`, 105, 55);
    doc.text(`Pin Code: ${customerInfo.pinCode || "N/A"}`, 105, 60);
    doc.text(`Address: ${customerInfo.billingAddress || "N/A"}`, 105, 65);

    // Product Table
    const productHeaders = [["Description", "HSN/SAC", "Qty", "Rate", "GST", "Amount"]];
    const productData = productItems.map((item) => [
      item.productName || "N/A",
      item.hsn || "N/A",
      item.qty || "N/A",
      item.price || "N/A",
      `${item.gst || 0}%`,
      (item.qty * item.price - item.discount || 0).toFixed(2),
    ]);

    doc.autoTable({
      head: productHeaders,
      body: productData,
      startY: 110,
      theme: "grid",
      styles: { fontSize: 10, textColor: 40 },
      headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] },
    });

    // Totals Section
    let finalY = doc.lastAutoTable.finalY;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Taxable: ₹${totals.totalTaxable.toFixed(2)}`, 14, finalY + 10);
    doc.text(`Total Tax: ₹${totals.totalTax.toFixed(2)}`, 14, finalY + 15);
    doc.text(`Grand Total: ₹${totals.grandTotal.toFixed(2)}`, 14, finalY + 20);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text(
      "Declaration: We declare that this invoice shows the actual price of the goods.",
      14,
      finalY + 30
    );
    doc.setFont("helvetica", "bold");
    doc.text("For XYZ SALES", 105, finalY + 40, null, null, "center");

    // Save PDF
    doc.save("SalesInvoice.pdf");
  };

  return (
    <div className="sales-invoice-container">
      <div className="card customer-info-section">
        <h3 className="section-title">Customer Information</h3>
        <div className="form-group">
          <label className="form-label">Customer Name *</label>
          <input
            className="form-input"
            type="text"
            value={customerInfo.customerName}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, customerName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <textarea
            className="form-textarea"
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
          />
        </div>
        {/* Add other fields for contact, phone number, GST, etc. */}
      </div>

      <div className="card invoice-details-section">
        <h3 className="section-title">Invoice Details</h3>
        <div className="form-group">
          <label className="form-label">Invoice Type *</label>
          <select
            className="form-input"
            value={invoiceDetails.invoiceType}
            onChange={(e) =>
              setInvoiceDetails({ ...invoiceDetails, invoiceType: e.target.value })
            }
          >
            <option value="">Select Type</option>
            <option value="Cash">Cash</option>
            <option value="Credit">Credit</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Invoice No *</label>
          <input
            className="form-input"
            type="text"
            value={invoiceDetails.invoiceNo}
            onChange={(e) =>
              setInvoiceDetails({ ...invoiceDetails, invoiceNo: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date *</label>
          <input
            className="form-input"
            type="date"
            value={invoiceDetails.date}
            onChange={(e) =>
              setInvoiceDetails({ ...invoiceDetails, date: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">Delivery Mode</label>
          <select
            className="form-input"
            value={invoiceDetails.deliveryMode}
            onChange={(e) =>
              setInvoiceDetails({ ...invoiceDetails, deliveryMode: e.target.value })
            }
          >
            <option value="">Select Mode</option>
            <option value="Courier">Courier</option>
            <option value="Hand Delivery">Hand Delivery</option>
          </select>
        </div>
        {/* Add more fields for delivery date, etc. */}
      </div>

      <div className="card product-items-section">
        <h3 className="section-title">Product Items</h3>
        <Button className="add-product-button" variant="contained" color="info" onClick={handleAddRow}>
          + Add Product
        </Button>
        {productItems.map((item, index) => (
          <div key={index} className="product-item-row">
            <input
              className="product-input"
              type="text"
              placeholder="Product Name"
              value={item.productName}
              onChange={(e) => handleProductChange(index, "productName", e.target.value)}
            />
            {/* Add inputs for HSN, quantity, price, GST, etc. */}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemoveRow(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="totals-section">
        <div className="totals-row">
          <label>Total Taxable:</label>
          <span>₹{totals.totalTaxable.toFixed(2)}</span>
        </div>
        <div className="totals-row">
          <label>Total Tax:</label>
          <span>₹{totals.totalTax.toFixed(2)}</span>
        </div>
        <div className="totals-row">
          <label>Grand Total:</label>
          <span>₹{totals.grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <Button variant="contained" color="primary" onClick={generatePDF}>
        Generate PDF
      </Button>
    </div>
  );
};

export default SalesInvoice;
