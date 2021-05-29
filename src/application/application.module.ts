import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import {CqrsModule} from "@nestjs/cqrs";

const Handlers = [];

@Module({
    imports: [CqrsModule, DomainModule, InfrastructureModule],
    providers: [...Handlers],
    exports: [CqrsModule, ...Handlers],
})
export class ApplicationModule {}
