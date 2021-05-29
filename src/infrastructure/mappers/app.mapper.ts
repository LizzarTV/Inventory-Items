import {Injectable} from "@nestjs/common";
import {BaseMapper} from "./base.mapper";
import {AppDomain} from "../../domain/aggregates/app.domain";
import {AppEntity} from "../entities/app.entity";
import {AppFactory} from "../../domain/factories/app.factory";

@Injectable()
export class AppMapper implements BaseMapper<AppDomain, AppEntity> {

    constructor(private readonly factory: AppFactory) {}

    public domainToEntity(domain: AppDomain): AppEntity {
        const { id, title, slug, active, created_at, updated_at, deleted_at } = domain.toAnemic();
        const entity = new AppEntity();
        entity.id = id;
        entity.title = title;
        entity.slug = slug;
        entity.active = active;
        entity.created_at = created_at;
        entity.updated_at = updated_at;
        entity.deleted_at = deleted_at;
        return entity;
    }

    public entityToDomain(entity: AppEntity): AppDomain {
        const { id, title, slug, active, created_at, updated_at, deleted_at } = entity;
        return this.factory.reconstitute({ id, title, slug, active, created_at, updated_at, deleted_at, isUpdated: !!updated_at, isDeleted: !!deleted_at });
    }
}