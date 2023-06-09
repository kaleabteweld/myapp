import React, { JSX } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';

export default function CreateSectionModal({ visible, onCancel, onSave }: {
    visible: boolean,
    onCancel: () => void,
    onSave: (value: any) => void
}) {
    const [form] = Form.useForm();

    const handleSave = () => {
        form.validateFields().then((values) => {
            onSave(values);
            form.resetFields();
        });
    };

    return (
        <Modal
            open={visible}
            title="Create Section"
            onCancel={onCancel}
            onOk={handleSave}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="itemNo" label="Item No">
                    <InputNumber />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input />
                </Form.Item>
                <Form.Item name="unit" label="Unit">
                    <Input />
                </Form.Item>
                <Form.Item name="qty" label="Qty">
                    <InputNumber />
                </Form.Item>
                <Form.Item name="rate" label="Rate">
                    <InputNumber />
                </Form.Item>
                <Form.Item name="amount" label="Amount">
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>
    );
};
