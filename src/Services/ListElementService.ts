import api from '../config/Api';
import { User } from '../types/models/User.model';
import {ListElement} from "../types/models/ListElement.model";

const ListElementService = {
    getListElement: async (listElementId: string): Promise<ListElement> => {
        const { data } = await api.get<ListElement>(`/listElement/${listElementId}`);
        return data;
    },

    updateListElement: (listElement: ListElement) => {
        return api.put(`/listElement/${listElement.id}`, listElement);
    },

    addListElement: async (listElement: ListElement) => {
        const res = await api.post(`/listElement/${listElement.id}`, listElement);
        return res.data;
    },

    getAllListElements: () => {
        return api.get(`/listElement`);
    },

    deleteListElement: (id: string) => {
        return api.delete(`/listElement/${id}`);
    },
};

export default ListElementService;
