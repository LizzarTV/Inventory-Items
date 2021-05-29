import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import {CqrsModule} from "@nestjs/cqrs";
import {GetItemsHandler} from "./queries/handlers/GetItems.handler";
import {GetItemHandler} from "./queries/handlers/GetItem.handler";
import {CreateItemHandler} from "./commands/handlers/CreateItem.handler";
import {UpdateItemHandler} from "./commands/handlers/UpdateItem.handler";
import {DeleteItemHandler} from "./commands/handlers/DeleteItem.handler";
import {RestoreItemHandler} from "./commands/handlers/RestoreItem.handler";

const Handlers = [
    GetItemsHandler,
    GetItemHandler,
    CreateItemHandler,
    UpdateItemHandler,
    DeleteItemHandler,
    RestoreItemHandler
];

@Module({
    imports: [CqrsModule, DomainModule, InfrastructureModule],
    providers: [...Handlers],
    exports: [CqrsModule, ...Handlers],
})
export class ApplicationModule {}
