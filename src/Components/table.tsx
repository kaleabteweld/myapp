import React from 'react';
import { Button, Table, message } from 'antd';
import EditSectionModal from './edit';
import CreateSectionModal from './create';

import { useGetConstructionItems, useDeleteConstructionItem, useUpdateConstructionItem, useAddConstructionItem, columns } from '../Query'
import { ISection } from '../Types';

export default function TableMain({ pageId }: { pageId: number }) {

    const [page, setPage] = React.useState<number>(pageId);

    React.useEffect(() => {
        if (pageId != -1) {
            setPage(pageId)
        }
    }, [pageId])


    const [editModalVisible, setEditModalVisible] = React.useState(false);
    const [editModalData, setEditModalData] = React.useState<any>();

    const [createModalVisible, setCreateModalVisible] = React.useState(false);
    const [createModalData, setCreateModalData] = React.useState(null);

    const { isLoading, error, data, refetch, isFetching } = useGetConstructionItems(page);

    const { mutate, isLoading: deleteLoading, error: deleteError, isSuccess } = useDeleteConstructionItem()
    const { mutate: updateMutate, isLoading: updateLoading, error: updateError, isSuccess: updateSuccess } = useUpdateConstructionItem()
    const { mutate: addMutate, isLoading: addLoading, error: addError, isSuccess: addSuccess } = useAddConstructionItem()



    const _columns = [...columns]
    _columns.push(
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (_: any, record: any) => (

                <button onClick={() => handleEdit(record)}>
                    Edit
                </button>
            ),
        },

        // Delete button column
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (_: any, record: any) => (
                <button onClick={() => handleDelete(record)}>
                    Delete
                </button>
            ),
        },
    )

    const handleEdit = (record: ISection) => {
        setEditModalData(record)
        setEditModalVisible(true)

    };

    const handleDelete = async (record: ISection) => {
        await mutate(record.id)
        if (isSuccess) {
            message.success('Deleted successfully')
            refetch()
        }
    };


    if (isFetching || deleteLoading || updateLoading || addLoading) return <p>Loading</p>
    if (error || deleteError || updateError || addError) return <p>error</p>

    return <React.Fragment>
        <Button onClick={() => setCreateModalVisible(true)}>Create</Button>

        <EditSectionModal
            visible={editModalVisible}
            section={editModalData}
            onCancel={() => setEditModalVisible(false)}
            onSave={async (newRecord) => {
                await updateMutate({ id: editModalData.id, data: newRecord })
                setEditModalVisible(false)
                if (updateSuccess) {
                    message.success('Updated successfully')
                    refetch()
                }
            }}
        />

        <CreateSectionModal
            visible={createModalVisible}
            onCancel={() => setCreateModalVisible(false)}
            onSave={(newRecord) => {
                addMutate({ pageId: page, data: newRecord })
                setCreateModalVisible(false)
                if (addSuccess) {
                    message.success('Created successfully')
                    refetch()
                }
            }}
        />



        <Table dataSource={data} columns={_columns} rowKey="id" />
    </React.Fragment>
}