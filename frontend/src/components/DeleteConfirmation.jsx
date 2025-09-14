import React from 'react';
import './AdminDashboard.css';

const DeleteConfirmation = ({ productName, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirm Deletion</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete <strong>"{productName}"</strong>? This action cannot be undone.</p>
        </div>
        <div className="modal-footer">
          <button className="action-btn delete" onClick={onConfirm}>Delete</button>
          <button className="action-btn view" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;