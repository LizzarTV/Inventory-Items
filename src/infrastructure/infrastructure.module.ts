import { Module } from '@nestjs/common';

const Repositories = [];
const Mappers = [];
const Entities = [];

const { MYSQL_HOST, MYSQL_PORT } = process.env;

@Module({
    imports: [],
    providers: [...Entities, ...Mappers, ...Repositories],
    exports: [...Entities, ...Mappers, ...Repositories],
})
export class InfrastructureModule {}
