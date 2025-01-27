import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./GSTScreens.css";
import { Button } from "@mui/material";

const PurchaseInvoice = () => {
  const [vendorInfo, setVendorInfo] = useState({
    vendorName: "",
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

  const [purchaseDetails, setPurchaseDetails] = useState({
    invoiceType: "",
    invoiceNo: "",
    date: "",
    challanNo: "",
    entryDate: "",
    deliveryMode: "",
    deliveryDate: ""
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
    doc.text("Tax Invoice", 105, 15, null, null, "center");
  
    // IRN and Ack Info
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text("IRN: e76f55a696c2ea55bc22c27452c004f5af25d4179a", 14, 25);
    doc.text("Ack No.: 112422876274534", 14, 30);
    doc.text("Ack Date: 3-Dec-24", 14, 35);
  
    // Vendor Information
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Vendor Information", 14, 45);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(`Name: ${vendorInfo.vendorName || "N/A"}`, 14, 50);
    doc.text(`Address: ${vendorInfo.address || "N/A"}`, 14, 55);
    doc.text(`Contact: ${vendorInfo.contactPerson || "N/A"}`, 14, 60);
    doc.text(`Phone: ${vendorInfo.phoneNo || "N/A"}`, 14, 65);
    doc.text(`GSTIN: ${vendorInfo.gstNumber || "N/A"}`, 14, 70);
  
    // Billing Address
    doc.setFont("helvetica", "bold");
    doc.text("Billing Address", 105, 45);
    doc.setFont("helvetica", "normal");
    doc.text(`City: ${vendorInfo.city || "N/A"}`, 105, 50);
    doc.text(`State: ${vendorInfo.state || "N/A"}`, 105, 55);
    doc.text(`Pin Code: ${vendorInfo.pinCode || "N/A"}`, 105, 60);
    doc.text(`Address: ${vendorInfo.billingAddress || "N/A"}`, 105, 65);
  
    // Bank Details
    doc.setFont("helvetica", "bold");
    doc.text("Bank Details", 14, 80);
    doc.setFont("helvetica", "normal");
    doc.text(`Bank Name: ${vendorInfo.bankName || "N/A"}`, 14, 85);
    doc.text(`IFSC: ${vendorInfo.ifsc || "N/A"}`, 14, 90);
    doc.text(`Account No.: ${vendorInfo.bankAccount || "N/A"}`, 14, 95);
    doc.text(`Branch Name: ${vendorInfo.branchName || "N/A"}`, 14, 100);
  
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
    doc.text("For YARS SOLUTIONS", 105, finalY + 40, null, null, "center");
  
    // Save PDF
    doc.save("PurchaseInvoice.pdf");
  };
  

  return (
    <div className="purchase-invoice-container">
      <div className="card vendor-info-section">
        <h3 className="section-title">Vendor Information</h3>
        <div className="form-group">
          <label className="form-label">M/S *</label>
          <select
            className="form-input"
            value={vendorInfo.vendorName}
            onChange={(e) => setVendorInfo({ ...vendorInfo, vendorName: e.target.value })}
          >
            <option value="">Select Vendor</option>
            <option value="Vendor 1">Vendor 1</option>
            <option value="Vendor 2">Vendor 2</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <textarea
            className="form-textarea"
            value={vendorInfo.address}
            onChange={(e) => setVendorInfo({ ...vendorInfo, address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Contact Person</label>
          <input
            className="form-input"
            type="text"
            value={vendorInfo.contactPerson}
            onChange={(e) => setVendorInfo({ ...vendorInfo, contactPerson: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone No</label>
          <input
            className="form-input"
            type="text"
            value={vendorInfo.phoneNo}
            onChange={(e) => setVendorInfo({ ...vendorInfo, phoneNo: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">GSTIN / PAN</label>
          <input
            className="form-input"
            type="text"
            value={vendorInfo.gstNumber}
            onChange={(e) => setVendorInfo({ ...vendorInfo, gstNumber: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Place of Supply</label>
          <select
            className="form-input"
            value={vendorInfo.placeOfSupply}
            onChange={(e) => setVendorInfo({ ...vendorInfo, placeOfSupply: e.target.value })}
          >
            <option value="Telangana">Telangana</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>
        </div>
      </div>
      {/* Vendor Billing Address Section */}
      <div className="card billing-address-section">
        <h3 className="section-title">Vendor Billing Address</h3>
        <div className="form-group">
          <label className="form-label">Pin Code</label>
          <input
            className="form-input"
            type="text"
            value={vendorInfo.pinCode}
            onChange={(e) => setVendorInfo({ ...vendorInfo, pinCode: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">City</label>
          <input
            className="form-input"
            type="text"
            value={vendorInfo.city}
            onChange={(e) => setVendorInfo({ ...vendorInfo, city: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">State</label>
          <input
            className="form-input"
            type="text"
            value={vendorInfo.state}
            onChange={(e) => setVendorInfo({ ...vendorInfo, state: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Additional Billing Address</label>
          <textarea
            className="form-textarea"
            value={vendorInfo.billingAddress}
            onChange={(e) => setVendorInfo({ ...vendorInfo, billingAddress: e.target.value })}
          />
        </div>
      </div>

      {/* Vendor Bank Details Section */}
      <div className="card vendor-bank-details-section">
        <h3 className="section-title">Bank Details</h3>
        <div className="form-group">
          <label className="form-label">Bank Name</label>
          <input
            className="form-input"
            type="text"
            value={vendorInfo.bankName}
            onChange={(e) => setVendorInfo({ ...vendorInfo, bankName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">IFSC Code</label>
          <input
            className="form-input"
            type="text"
            value={vendorInfo.ifsc}
            onChange={(e) => setVendorInfo({ ...vendorInfo, ifsc: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Bank Account No.</label>
          <input
            className="form-input"
            type="text"
            value={vendorInfo.bankAccount}
            onChange={(e) => setVendorInfo({ ...vendorInfo, bankAccount: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Branch Name</label>
          <input
            className="form-input"
            type="text"
            value={vendorInfo.branchName}
            onChange={(e) => setVendorInfo({ ...vendorInfo, branchName: e.target.value })}
          />
        </div>
      </div>

      {/* Purchase Invoice Details Section */}
      <div className="card purchase-details-section">
        <h3 className="section-title">Purchase Invoice Details</h3>
        <div className="form-group">
          <label className="form-label">Purchase Invoice Type</label>
          <select
            className="form-input"
            value={purchaseDetails.invoiceType}
            onChange={(e) =>
              setPurchaseDetails({ ...purchaseDetails, invoiceType: e.target.value })
            }
          >
            <option value="">Select Type</option>
            <option value="Cash">Cash</option>
            <option value="Credit">Credit</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Date *</label>
          <input
            className="form-input"
            type="date"
            value={purchaseDetails.date}
            onChange={(e) => setPurchaseDetails({ ...purchaseDetails, date: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Invoice No *</label>
          <input
            className="form-input"
            type="text"
            value={purchaseDetails.invoiceNo}
            onChange={(e) =>
              setPurchaseDetails({ ...purchaseDetails, invoiceNo: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">Challan No</label>
          <input
            className="form-input"
            type="text"
            value={purchaseDetails.challanNo}
            onChange={(e) =>
              setPurchaseDetails({ ...purchaseDetails, challanNo: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">Entry Date</label>
          <input
            className="form-input"
            type="date"
            value={purchaseDetails.entryDate}
            onChange={(e) =>
              setPurchaseDetails({ ...purchaseDetails, entryDate: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">Delivery Date</label>
          <input
            className="form-input"
            type="date"
            value={purchaseDetails.deliveryDate}
            onChange={(e) =>
              setPurchaseDetails({ ...purchaseDetails, deliveryDate: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">Delivery Mode</label>
          <select
            className="form-input"
            value={purchaseDetails.deliveryMode}
            onChange={(e) =>
              setPurchaseDetails({ ...purchaseDetails, deliveryMode: e.target.value })
            }
          >
            <option value="">Select Mode</option>
            <option value="Courier">Courier</option>
            <option value="Hand Delivery">Hand Delivery</option>
          </select>
        </div>
      </div>

      {/* Product Items Section */}
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
            <input
              className="product-input"
              type="text"
              placeholder="HSN/SAC"
              value={item.hsn}
              onChange={(e) => handleProductChange(index, "hsn", e.target.value)}
            />
            <input
              className="product-input"
              type="number"
              placeholder="Qty"
              value={item.qty}
              onChange={(e) => handleProductChange(index, "qty", e.target.value)}
            />
            <input
              className="product-input"
              type="text"
              placeholder="UOM"
              value={item.uom}
              onChange={(e) => handleProductChange(index, "uom", e.target.value)}
            />
            <input
              className="product-input"
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleProductChange(index, "price", e.target.value)}
            />
            <input
              className="product-input"
              type="number"
              placeholder="Discount"
              value={item.discount}
              onChange={(e) => handleProductChange(index, "discount", e.target.value)}
            />
            <input
              className="product-input"
              type="number"
              placeholder="GST %"
              value={item.gst}
              onChange={(e) => handleProductChange(index, "gst", e.target.value)}
            />
            <button
              className="delete-product-button"
              onClick={() => handleRemoveRow(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="card terms-conditions-section">
        <h3 className="section-title">Terms & Conditions / Additional Notes</h3>
        <textarea
          className="form-textarea"
          placeholder="Enter terms and conditions"
        />
      </div>

      <div className="card totals-section">
        <h3 className="section-title">Total Calculation</h3>
        <div className="totals-row">
          <label className="totals-label">Total Taxable</label>
          <span className="totals-value">{totals.totalTaxable}</span>
        </div>
        <div className="totals-row">
          <label className="totals-label">Total Tax</label>
          <span className="totals-value">{totals.totalTax}</span>
        </div>
        <div className="totals-row">
          <label className="totals-label">Grand Total</label>
          <span className="totals-value">{totals.grandTotal}</span>
        </div>
      </div>

      <div className="action-buttons-section" style={{ float: "right", marginBottom: "20px" }}>
        {/* <button className="action-button back-button" onClick={() => console.log("Back")}>
          Back
        </button>
        <button className="action-button discard-button" onClick={() => console.log("Discard")}>
          Discard
        </button> */}
        <button className="action-button save-pdf-button" onClick={generatePDF}>
          Save as PDF
        </button>
      </div>
    </div>
  );


};

export default PurchaseInvoice;
