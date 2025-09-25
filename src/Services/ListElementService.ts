import api from '../config/Api';
import {ListElement} from "../types/models/ListElement.model";

const ListElementService = {
    getListElement: async (listElementId: string): Promise<ListElement> => {
        const { data } = await api.get<ListElement>(`/list-element/${listElementId}`);
        return data;
    },

    updateListElement: async (listElement: ListElement) => {
        return await api.put(`/list-element/${listElement.id}`, listElement);
    },

    addListElement: async (listElement: ListElement) => {
        const res = await api.post(`/list-element`, listElement);
        return res.data;
    },

    getAllListElements: () => {
        return api.get(`/list-element`);
    },

    deleteListElement: (id: string) => {
        return api.delete(`/list-element/${id}`);
    },
};

export default ListElementService;
