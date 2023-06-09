import { Upload, Button, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

export default function FileUploadForm() {
    const [showModal, setshowModal] = React.useState(false)

    const queryClient = useQueryClient()



    const handleFileUpload = async (info: any) => {

        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);

            // await queryClient.invalidateQueries()

            setshowModal(false)
        } else if (info.file.status === 'uploading') {
            message.loading({ content: 'Uploading...', key: 'updatable' });
        } else if (info.file.status === 'error') {
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
        action: 'http://localhost:5000/xlsx/file/upload',
        accept: '.*',
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
