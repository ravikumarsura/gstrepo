import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Add, Search, Edit, Visibility, Delete } from '@mui/icons-material';
import './GSTScreens.css';

function CustomerVendor() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [formData, setFormData] = useState({
    balanceType: 'Credit',
    amount: '',
    licenseNo: '',
    faxNo: '',
    website: '',
    creditLimit: '',
    dueDays: '',
    note: '',
    enable: true,
  });

  const [data, setData] = useState([
    {
      id: 1,
      balanceType: 'Credit',
      amount: '1000',
      licenseNo: '1234',
      faxNo: '5678',
      website: 'www.example.com',
      creditLimit: '5000',
      dueDays: '30',
      note: 'Test note',
      enable: true,
    },
  ]);

  const handleOpenDialog = (item = null, isView = false) => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        balanceType: 'Credit',
        amount: '',
        licenseNo: '',
        faxNo: '',
        website: '',
        creditLimit: '',
        dueDays: '',
        note: '',
        enable: true,
      });
    }
    setViewMode(isView);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setViewMode(false);
  };

  const handleSave = () => {
    if (formData.id) {
      setData((prev) =>
        prev.map((item) => (item.id === formData.id ? formData : item))
      );
    } else {
      setData((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="customer-vendor-container">
      <div className="customer-vendor-header">
        <Typography variant="h4" className="customer-vendor-title">
          Customer / Vendor
        </Typography>
        <div className="customer-vendor-actions">
          <TextField
            placeholder="Search"
            size="small"
            variant="outlined"
            className="customer-vendor-search"
            InputProps={{
              startAdornment: <Search style={{ marginRight: '8px' }} />,
            }}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            className="customer-vendor-add-btn"
          >
            Add New
          </Button>
        </div>
      </div>

      <div className="customer-vendor-summary">
        <Card className="customer-vendor-card">
          <CardContent>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h4">50</Typography>
          </CardContent>
        </Card>
        <Card className="customer-vendor-card">
          <CardContent>
            <Typography variant="h6">Customers</Typography>
            <Typography variant="h4">30</Typography>
          </CardContent>
        </Card>
        <Card className="customer-vendor-card">
          <CardContent>
            <Typography variant="h6">Vendor</Typography>
            <Typography variant="h4">50</Typography>
          </CardContent>
        </Card>
        <Card className="customer-vendor-card">
          <CardContent>
            <Typography variant="h6">Customer Vendor</Typography>
            <Typography variant="h4">30</Typography>
          </CardContent>
        </Card>
      </div>
      <div className="customer-vendor-table">
        <table >
          <thead>
            <tr>
              <th>ID</th>
              <th>Balance Type</th>
              <th>Amount</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.balanceType}</td>
                <td>{item.amount}</td>
                <td>{item.website}</td>
                <td>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => handleOpenDialog(item, true)}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleOpenDialog(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        className="customer-vendor-dialog"
      >
        <DialogTitle>
          {viewMode
            ? 'View Details'
            : formData.id
              ? 'Edit Details'
              : 'Add New'}
        </DialogTitle>
        <DialogContent>
          <div className="customer-vendor-dialog-content">
            <Typography variant="subtitle1">Customer Balance</Typography>
            <RadioGroup
              row
              value={formData.balanceType}
              onChange={(e) =>
                setFormData({ ...formData, balanceType: e.target.value })
              }
              disabled={viewMode}
            >
              <FormControlLabel value="Credit" control={<Radio />} label="Credit" />
              <FormControlLabel value="Debit" control={<Radio />} label="Debit" />
            </RadioGroup>
            <TextField
              label="Amount"
              fullWidth
              margin="normal"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              disabled={viewMode}
            />
            <TextField
              label="License No"
              fullWidth
              margin="normal"
              value={formData.licenseNo}
              onChange={(e) =>
                setFormData({ ...formData, licenseNo: e.target.value })
              }
              disabled={viewMode}
            />
            <TextField
              label="Fax No"
              fullWidth
              margin="normal"
              value={formData.faxNo}
              onChange={(e) =>
                setFormData({ ...formData, faxNo: e.target.value })
              }
              disabled={viewMode}
            />
            <TextField
              label="Website"
              fullWidth
              margin="normal"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              disabled={viewMode}
            />
            <TextField
              label="Credit Limit"
              fullWidth
              margin="normal"
              value={formData.creditLimit}
              onChange={(e) =>
                setFormData({ ...formData, creditLimit: e.target.value })
              }
              disabled={viewMode}
            />
            <TextField
              label="Due Days"
              fullWidth
              margin="normal"
              value={formData.dueDays}
              onChange={(e) =>
                setFormData({ ...formData, dueDays: e.target.value })
              }
              disabled={viewMode}
            />
            <TextField
              label="Note"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              disabled={viewMode}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.enable}
                  onChange={(e) =>
                    setFormData({ ...formData, enable: e.target.checked })
                  }
                  disabled={viewMode}
                />
              }
              label="Enable"
            />
          </div>
        </DialogContent>
        {!viewMode && (
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

export default CustomerVendor;
