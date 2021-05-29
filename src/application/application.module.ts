import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import {CqrsModule} from "@nestjs/cqrs";
import {GetItemsHandler} from "./queries/handlers/GetItems.handler";
import {GetItemHandler} from "./queries/handlers/GetItem.handler";

const Handlers = [
    GetItemsHandler,
    GetItemHandler
];

@Module({
    imports: [CqrsModule, DomainModule, InfrastructureModule],
    providers: [...Handlers],
    exports: [CqrsModule, ...Handlers],
})
export class ApplicationModule {}
