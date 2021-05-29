export interface BaseFactory<T, V, X> {
    reconstitute(anemic: T): V;
    constitute(domain: V): T;
    createFactory(data: X): V;
}