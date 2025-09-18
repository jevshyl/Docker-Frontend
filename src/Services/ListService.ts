import api from '../config/Api';
import { List } from '../types/models/List.model';

const ListService = {
    getList: async (listId: string): Promise<List> => {
        const { data } = await api.get<List>(`/list/${listId}`);
        return data;
    },

    updateList: (list: List) => {
        return api.put(`/list/${list.id}`, list);
    },

    getAllLists: () => {
        return api.get(`/list`);
    },
};

export default ListService;
