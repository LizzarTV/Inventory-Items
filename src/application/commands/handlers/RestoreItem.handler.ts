import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {AppFactory} from "../../../domain/factories/app.factory";
import {RestoreItemCommand} from "../impl/RestoreItem.command";

@CommandHandler(RestoreItemCommand)
export class RestoreItemHandler implements ICommandHandler<RestoreItemCommand> {

    constructor(
        private readonly eventPublisher: EventPublisher,
        private readonly factory: AppFactory,
        // TODO: Add Repository
    ) { }

    public async execute(command: RestoreItemCommand): Promise<void> {
        const { id } = command;
        const model = null; // TODO: Replace with Repository Call
        // const item = this.eventPublisher.mergeObjectContext(model);
        // item.delete();
        // item.commit();
        // TODO: Save Repository
    }
}