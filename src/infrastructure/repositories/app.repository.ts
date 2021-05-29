import {EntityRepository, getRepository} from "typeorm";
import {AppEntity} from "../entities/app.entity";
import {BaseRepository} from "./base.repository";
import {AppDomain} from "../../domain/aggregates/app.domain";
import {AppMapper} from "../mappers/app.mapper";
import {Nullable} from "../../shared";

@EntityRepository(AppEntity)
export class AppRepository implements BaseRepository<AppDomain> {

    constructor(private readonly mapper: AppMapper) { }

    public async save(domain: AppDomain): Promise<void> {
        const entity = this.mapper.domainToEntity(domain);
        await getRepository(AppEntity).save(entity);
    }

    public async findList(): Promise<Nullable<AppDomain[]>> {
        const entities = await getRepository(AppEntity).find({
            withDeleted: true,
            order: {
                created_at: 'DESC',
            },
        });
        return entities.length
            ? entities.map((entity: AppEntity) => this.mapper.entityToDomain(entity))
            : null;
    }

    public async findById(id: string): Promise<Nullable<AppDomain>> {
        const entity = await getRepository(AppEntity).findOne(
            { id },
            { withDeleted: true },
        );
        return entity ? this.mapper.entityToDomain(entity) : null;
    }

    public async findBySlug(slug: string): Promise<Nullable<AppDomain>> {
        const entity = await getRepository(AppEntity).findOne(
            { slug },
            { withDeleted: true },
        );
        return entity ? this.mapper.entityToDomain(entity) : null;
    }

    public async findByTitle(title: string): Promise<Nullable<AppDomain>> {
        const entity = await getRepository(AppEntity).findOne(
            { title },
            { withDeleted: true },
        );
        return entity ? this.mapper.entityToDomain(entity) : null;
    }
}