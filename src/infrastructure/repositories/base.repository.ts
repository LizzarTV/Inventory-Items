import { Nullable } from '../../shared';

export interface BaseRepository<T> {
    save(domain: T): Promise<void>;
    findList(): Promise<Nullable<T[]>>;
    findById(id: string): Promise<Nullable<T>>;
    findBySlug(slug: string): Promise<Nullable<T>>;
    findByTitle(title: string): Promise<Nullable<T>>;
}