import {Controller, UseFilters} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ExceptionFilter} from "../../shared/base.filter";
import {Ctx, MessagePattern, Payload, RmqContext, RpcException} from "@nestjs/microservices";
import {CreateItem, DeleteItem, GetItem, UpdateItem} from "../dtos/app.dto";
import {GetItemsQuery} from "../../application/queries/impl/GetItems.query";
import {GetItemQuery} from "../../application/queries/impl/GetItem.query";
import {CreateItemCommand} from "../../application/commands/impl/CreateItem.command";
import {UpdateItemCommand} from "../../application/commands/impl/UpdateItem.command";
import {DeleteItemCommand} from "../../application/commands/impl/DeleteItem.command";
import {RestoreItemCommand} from "../../application/commands/impl/RestoreItem.command";

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
        try {
            return this.queryBus.execute(new GetItemsQuery());
        } catch (e) {
            throw new RpcException(e);
        }

    }

    @UseFilters(new ExceptionFilter())
    @MessagePattern('item-single')
    getItem(@Payload() data: GetItem, @Ctx() context: RmqContext) {
        this.ackMessage(context);
        try {
            return this.queryBus.execute(new GetItemQuery(data.id));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    @UseFilters(new ExceptionFilter())
    @MessagePattern('item-create')
    createItem(@Payload() data: CreateItem, @Ctx() context: RmqContext) {
        this.ackMessage(context);
        try {
            return this.commandBus.execute(new CreateItemCommand(data.title));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    @UseFilters(new ExceptionFilter())
    @MessagePattern('item-update')
    updateItem(@Payload() data: UpdateItem, @Ctx() context: RmqContext) {
        this.ackMessage(context);
        try {
            return this.commandBus.execute(new UpdateItemCommand(data.id, data.title, data.active));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    @UseFilters(new ExceptionFilter())
    @MessagePattern('item-delete')
    deleteItem(@Payload() data: DeleteItem, @Ctx() context: RmqContext) {
        this.ackMessage(context);
        try {
            return this.commandBus.execute(new DeleteItemCommand(data.id));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    @UseFilters(new ExceptionFilter())
    @MessagePattern('item-restore')
    restoreItem(@Payload() data: DeleteItem, @Ctx() context: RmqContext) {
        this.ackMessage(context);
        try {
            return this.commandBus.execute(new RestoreItemCommand(data.id));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    private ackMessage(context: RmqContext): void {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);
    }
}