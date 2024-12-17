import React from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons'; 

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ visible, onCancel, onConfirm }) => {
    return (
      <Modal
        title={null} 
        visible={visible}
        onCancel={onCancel}
        footer={null} 
        centered 
        className="delete-confirm-modal"
      >
        <div className="modal-content">
          <div className="modal-icon-wrapper">
            <CloseOutlined className="modal-icon" />
          </div>
          <p className="modal-text">Are you sure you want to delete this post?</p>
          <div className="modal-actions">
            <Button type="default" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" danger onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    );
  };
  
  export default DeleteConfirmationModal;