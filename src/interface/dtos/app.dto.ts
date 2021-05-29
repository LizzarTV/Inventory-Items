import { Optional } from '../../shared';

export interface GetItem {
    id: string;
}

export interface CreateItem {
    title: string;
}

export interface UpdateItem {
    id: string;
    title: Optional<string>;
    active: Optional<boolean>;
}

export interface DeleteItem {
    id: string;
}