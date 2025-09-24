import { Role } from './Role.model';
import {ListElement} from "./ListElement.model";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  listElements: ListElement[];
};
