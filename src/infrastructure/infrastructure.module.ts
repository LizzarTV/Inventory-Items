import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DomainModule} from "../domain/domain.module";
import {AppEntity} from "./entities/app.entity";
import {AppMapper} from "./mappers/app.mapper";
import {AppRepository} from "./repositories/app.repository";

const Repositories = [AppRepository];
const Mappers = [AppMapper];
const Entities = [AppEntity];

const { MYSQL_HOST, MYSQL_PORT } = process.env;

@Module({
    imports: [
        DomainModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: MYSQL_HOST || 'localhost',
            port: Number(MYSQL_PORT) || 3306,
            username: 'inventory',
            password: 'inventory',
            database: 'thoraxia_inventory',
            entities: Entities,
            synchronize: true,
            retryAttempts: 3,
            retryDelay: 1000,
        }),
    ],
    providers: [...Entities, ...Mappers, ...Repositories],
    exports: [TypeOrmModule, ...Entities, ...Mappers, ...Repositories],
})
export class InfrastructureModule {}
