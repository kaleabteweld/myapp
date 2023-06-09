import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ISection } from '../Types';
import axios from 'axios';

export const baseUrl = `http://localhost:5000/xlsx/`;

export const useGetConstructionItems = (page: number) => {

    return useQuery({
        queryKey: ['constructionItems', page],
        queryFn: () =>
            fetch(`${baseUrl}constructionItems?pageId=${page}`).then(
                (res) => res.json(),
            ),
        refetchOnWindowFocus: false,
    })
}

export const useGetPages = () => useQuery({
    queryKey: ['pages'],
    queryFn: () =>
        fetch(`${baseUrl}pages`).then(
            (res) => res.json(),
        ),
    refetchOnWindowFocus: false,
})

export const useDeleteConstructionItem = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['constructionItems'],
        mutationFn: (id: number = 0) =>
            fetch(`${baseUrl}${id}`, {
                method: 'DELETE',
            }).then((res) => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries(['constructionItems'])
        }

    })
}

export const useAddConstructionItem = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['constructionItems'],
        mutationFn: ({ pageId, data }: { pageId: number, data: ISection }) =>
            axios.post(`${baseUrl}${pageId}`, data).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['constructionItems'])
        }
    })
}


export const useUpdateConstructionItem = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['constructionItems'],
        mutationFn: ({ id, data }: { id: number, data: ISection }) => {
            return axios.put(`${baseUrl}/${id}`, data).then((res) => res.data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['constructionItems'])
        }
    })
}

export const columns: any[] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Item No',
        dataIndex: 'itemNo',
        key: 'itemNo',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit',
    },
    {
        title: 'Qty',
        dataIndex: 'qty',
        key: 'qty',
    },
    {
        title: 'Rate',
        dataIndex: 'rate',
        key: 'rate',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
];