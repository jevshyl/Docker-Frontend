import {User} from "./User.model";

export type ListElement = {
    id?: string;
    title: string;
    text: string;
    creationDate?: string;
    importance: string;
    user?: User[]
};
