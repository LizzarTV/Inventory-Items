export interface BaseMapper<T, V> {
    domainToEntity(domain: T): V;
    entityToDomain(entity: V): T;
}