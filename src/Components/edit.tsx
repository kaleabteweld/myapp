import React, { JSX } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';
import { IEditSectionProps } from '../Types';

export default function EditSectionModal({ section, visible, onCancel, onSave }: {
    section?: IEditSectionProps,
    visible: boolean,
    onCancel: () => void,
    onSave: (value: any) => void
}) {
    const [form] = Form.useForm();

    form.setFieldsValue(section);

    const handleSave = () => {
        form.validateFields().then((values) => {
            const updatedSection = { ...section, ...values };
            delete updatedSection.id;
            onSave(updatedSection);
        });
    };

    return (<React.Fragment>
        <Modal
            open={visible}
            title="Edit Section"
            onCancel={onCancel}
            onOk={handleSave}>

            <Form form={form} layout="vertical" >

                <Form.Item name="itemNo" label="Item No" >
                    <InputNumber />
                </Form.Item>

                <Form.Item name="description" label="Description" >
                    <Input />
                </Form.Item>

                <Form.Item name="unit" label="Unit" >
                    <Input />
                </Form.Item>


                <Form.Item name="qty" label="Qty" >
                    <InputNumber />
                </Form.Item>


                <Form.Item name="rate" label="Rate" >
                    <InputNumber />
                </Form.Item>

                <Form.Item name="amount" label="Amount" >
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>

    </React.Fragment>);

};
