import React, { useState } from 'react';
import './Billing.css'; 

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [newBill, setNewBill] = useState({
    BillID: '', PatientID: '', Date: '', BillAmount: '', PaymentStatus: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBill({ ...newBill, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (editIndex === -1) {
      const existingBill = bills.find(bill => bill.BillID === newBill.BillID);
      if (existingBill) {
        alert('Bill ID already exists. Please use a unique Bill ID.');
        return;
      }
      setBills([...bills, newBill]);
    } else {
      const updatedBills = [...bills];
      updatedBills[editIndex] = newBill;
      setBills(updatedBills);
      setEditIndex(-1);
    }
    setNewBill({ BillID: '', PatientID: '', Date: '', BillAmount: '', PaymentStatus: '' });
  };

  const handleEdit = (index) => {
    setNewBill(bills[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedBills = bills.filter((_, i) => i !== index);
    setBills(updatedBills);
  };

  return (
    <div className="container">
      <h1>Billing Master</h1>

      <form>
        <div>
          <label>Bill ID: </label>
          <input type="text" name="BillID" value={newBill.BillID} onChange={handleChange} required />
        </div>
        <div>
          <label>Patient ID: </label>
          <input type="text" name="PatientID" value={newBill.PatientID} onChange={handleChange} required />
        </div>
        <div>
          <label>Date: </label>
          <input type="date" name="Date" value={newBill.Date} onChange={handleChange} required />
        </div>
        <div>
          <label>Bill Amount: </label>
          <input type="number" name="BillAmount" value={newBill.BillAmount} onChange={handleChange} required />
        </div>
        <div>
          <label>Payment Status: </label>
          <select name="PaymentStatus" value={newBill.PaymentStatus} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button type="button" onClick={handleAddOrUpdate}>
          {editIndex === -1 ? 'Add Bill' : 'Update Bill'}
        </button>
      </form>

      <table >
        <thead>
          <tr >
            <th  className="trc">Bill ID</th>
            <th  className="trc">Patient ID</th>
            <th  className="trc">Date</th>
            <th  className="trc">Bill Amount</th>
            <th  className="trc">Payment Status</th>
            <th  className="trc">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={bill.BillID}>
              <td>{bill.BillID}</td>
              <td>{bill.PatientID}</td>
              <td>{bill.Date}</td>
              <td>{bill.BillAmount}</td>
              <td>{bill.PaymentStatus}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Billing;
