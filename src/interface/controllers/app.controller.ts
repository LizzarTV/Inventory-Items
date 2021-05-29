import {Controller, UseFilters} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ExceptionFilter} from "../../shared/base.filter";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {CreateItem, DeleteItem, GetItem, UpdateItem} from "../dtos/app.dto";
import {GetItemsQuery} from "../../application/queries/impl/GetItems.query";
import {GetItemQuery} from "../../application/queries/impl/GetItem.query";

@Controller()
export class AppController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @UseFilters(new ExceptionFilter())
    @MessagePattern('item-list')
    getItems(@Ctx() context: RmqContext) {
        this.ackMessage(context);
        return this.queryBus.execute(new GetItemsQuery());
    }

    @UseFilters(new ExceptionFilter())
    @MessagePattern('item-single')
    getItem(@Payload() data: GetItem, @Ctx() context: RmqContext) {
        this.ackMessage(context);
        return this.queryBus.execute(new GetItemQuery(data.id));
    }

    @UseFilters(new ExceptionFilter())
    @MessagePattern('item-create')
    createItem(@Payload() data: CreateItem, @Ctx() context: RmqContext) {
        this.ackMessage(context);
        return this.commandBus.execute(new CreateItemCommand(data.title));
    }

    @UseFilters(new ExceptionFilter())
    @MessagePattern('item-update')
    updateItem(@Payload() data: UpdateItem, @Ctx() context: RmqContext) {
        this.ackMessage(context);
        return this.commandBus.execute(new UpdateItemCommand(data.id, data.title, data.active));
    }

    @UseFilters(new ExceptionFilter())
    @MessagePattern('item-delete')
    deleteItem(@Payload() data: DeleteItem, @Ctx() context: RmqContext) {
        this.ackMessage(context);
        return this.commandBus.execute(new DeleteItemCommand(data.id));
    }

    @UseFilters(new ExceptionFilter())
    @MessagePattern('item-restore')
    restoreItem(@Payload() data: DeleteItem, @Ctx() context: RmqContext) {
        this.ackMessage(context);
        return this.commandBus.execute(new RestoreItemCommand(data.id));
    }

    private ackMessage(context: RmqContext): void {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);
    }
}