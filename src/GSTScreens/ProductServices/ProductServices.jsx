import React, { useState } from "react";
import "../GSTScreens.css";

const ProductServices = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState([
    { id: 1, name: "Product A", type: "Type 1", price: "100", description: "Description A" },
    { id: 2, name: "Product B", type: "Type 2", price: "200", description: "Description B" },
  ]);

  const handleOpenDialog = (item = {}, editMode = false) => {
    setCurrentData(item);
    setIsEditMode(editMode);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentData({});
    setIsEditMode(false);
  };

  const handleSave = () => {
    if (isEditMode) {
      // Update existing data
      setData((prev) =>
        prev.map((item) => (item.id === currentData.id ? currentData : item))
      );
    } else {
      // Add new data
      setData((prev) => [
        ...prev,
        { ...currentData, id: Date.now() }, 
      ]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="productservice-container">
      <h1 className="productservice-title">Products and Services</h1>

      {/* Cards */}
      <div className="productservice-cards">
        {["Product A", "Product B", "Product C", "Product D"].map((name, index) => (
          <div className="productservice-card" key={index}>
            <h2>{name}</h2>
            <p>Details about {name}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="productservice-table-container">
        <div className="table-header">
          <h2>Product/Service List</h2>
          <button className="add-button" onClick={() => handleOpenDialog({}, false)}>
            Add Product/Service
          </button>
        </div>
        <table className="productservice-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => handleOpenDialog(item, true)}>Edit</button>
                  <button onClick={() => handleOpenDialog(item, false)}>View</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog */}
      {openDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h3>{isEditMode ? "Edit Product/Service" : "Add Product/Service"}</h3>
            <label>Name:</label>
            <input
              type="text"
              value={currentData.name || ""}
              onChange={(e) => setCurrentData({ ...currentData, name: e.target.value })}
            />
            <label>Type:</label>
            <input
              type="text"
              value={currentData.type || ""}
              onChange={(e) => setCurrentData({ ...currentData, type: e.target.value })}
            />
            <label>Price:</label>
            <input
              type="text"
              value={currentData.price || ""}
              onChange={(e) => setCurrentData({ ...currentData, price: e.target.value })}
            />
            <label>Description:</label>
            <textarea
              value={currentData.description || ""}
              onChange={(e) =>
                setCurrentData({ ...currentData, description: e.target.value })
              }
            ></textarea>
            <div className="dialog-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCloseDialog}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductServices;
