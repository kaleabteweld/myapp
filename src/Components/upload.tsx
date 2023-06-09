import { Upload, Button, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import axios from 'axios';

export default function FileUploadForm() {
    const [showModal, setshowModal] = React.useState(false)


    const handleFileUpload = (info: any) => {


        if (info.status === 'done') {
            message.success(`${info.name} file uploaded successfully.`);
            // Process the uploaded file here
        } else if (info.status === 'error') {
            message.error(`${info.name} file upload failed.`);
        }
    };

    const handleModalOpen = () => {
        setshowModal(true);
    };

    const handleModalClose = () => {
        setshowModal(false);
    };

    const uploadProps = {
        name: 'file',
        action: 'http://localhost:5000/xlsx/upload', // Replace with your actual upload URL
        accept: '.*', // Specify the allowed file types
        onChange: handleFileUpload,
    };

    return (
        <div>
            <Button onClick={handleModalOpen} icon={<UploadOutlined />}>
                Select File
            </Button>
            <Modal
                title="Upload File"
                open={showModal}
                onCancel={handleModalClose}
                footer={[
                    <Button key="cancel" onClick={handleModalClose}>
                        Cancel
                    </Button>,
                ]}
            >
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Browse File</Button>
                </Upload>
            </Modal>
        </div>
    );

}
