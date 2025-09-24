import {User} from "./User.model";

export type ListElement = {
    id?: string;
    title: string;
    text: string;
    created_at?: string;
    importance: string;
    user?: User[]
};
