import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {DeleteItemCommand} from "../impl/DeleteItem.command";
import {AppFactory} from "../../../domain/factories/app.factory";
import {AppRepository} from "../../../infrastructure/repositories/app.repository";
import {RpcException} from "@nestjs/microservices";
import {HttpStatus} from "@nestjs/common";

@CommandHandler(DeleteItemCommand)
export class DeleteItemHandler implements ICommandHandler<DeleteItemCommand> {

    constructor(
        private readonly eventPublisher: EventPublisher,
        private readonly factory: AppFactory,
        private readonly repository: AppRepository
    ) { }

    public async execute(command: DeleteItemCommand): Promise<void> {
        const { id } = command;
        const model = await this.repository.findById(id);
        if (model !== null) {
            const item = this.eventPublisher.mergeObjectContext(model);
            item.delete();
            item.commit();
            await this.repository.save(item);
        } else {
            throw new RpcException({
                code: HttpStatus.NOT_FOUND,
                message: 'Entity not found',
            });
        }
    }
}