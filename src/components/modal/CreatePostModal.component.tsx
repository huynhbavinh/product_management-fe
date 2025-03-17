import { useState } from 'react';
import { Modal, Input, Form } from 'antd';
import axiosInstance from '../../api/http';

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

function CreatePostModal({ open, onClose, onPostCreated }: CreatePostModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      await axiosInstance.post('/posts', values);
      form.resetFields();
      onClose();
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Share your thoughts"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreatePostModal;