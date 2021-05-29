import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {DeleteItemCommand} from "../impl/DeleteItem.command";
import {AppFactory} from "../../../domain/factories/app.factory";

@CommandHandler(DeleteItemCommand)
export class DeleteItemHandler implements ICommandHandler<DeleteItemCommand> {

    constructor(
        private readonly eventPublisher: EventPublisher,
        private readonly factory: AppFactory,
        // TODO: Add Repository
    ) { }

    public async execute(command: DeleteItemCommand): Promise<void> {
        const { id } = command;
        const model = null; // TODO: Replace with Repository Call
        // const item = this.eventPublisher.mergeObjectContext(model);
        // item.delete();
        // item.commit();
        // TODO: Save Repository
    }
}