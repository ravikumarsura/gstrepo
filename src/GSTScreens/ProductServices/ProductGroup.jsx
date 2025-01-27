
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "../GSTScreens.css";

const ProductGroup = () => {
  const [open, setOpen] = useState(false);
  const [productGroups, setProductGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({ name: "", description: "" });
  const [editIndex, setEditIndex] = useState(-1);

  const handleOpen = () => {
    setOpen(true);
    setCurrentGroup({ name: "", description: "" });
    setEditIndex(-1);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (editIndex === -1) {
      setProductGroups([...productGroups, currentGroup]);
    } else {
      const updatedGroups = [...productGroups];
      updatedGroups[editIndex] = currentGroup;
      setProductGroups(updatedGroups);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setCurrentGroup(productGroups[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    setProductGroups(productGroups.filter((_, i) => i !== index));
  };

  return (
    <div className="product-group-container">
      <h1>Product Groups</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Product Group
      </Button>
      <TableContainer component={Paper} className="product-group-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Group Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productGroups.map((group, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex === -1 ? "Add Product Group" : "Edit Product Group"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Group Name"
            fullWidth
            margin="normal"
            value={currentGroup.name}
            onChange={(e) => setCurrentGroup({ ...currentGroup, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={currentGroup.description}
            onChange={(e) => setCurrentGroup({ ...currentGroup, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductGroup;
