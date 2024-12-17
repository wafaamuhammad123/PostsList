import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';



const EditPostModal: React.FC<EditPostModalProps> = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal visible={visible} title="Edit Post" onCancel={onCancel} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          label="Body"
          name="body"
          rules={[{ required: true, message: 'Please enter the body' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter body" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPostModal;
