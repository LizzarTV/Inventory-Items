import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {AppFactory} from "../../../domain/factories/app.factory";
import {RestoreItemCommand} from "../impl/RestoreItem.command";
import {AppRepository} from "../../../infrastructure/repositories/app.repository";

@CommandHandler(RestoreItemCommand)
export class RestoreItemHandler implements ICommandHandler<RestoreItemCommand> {

    constructor(
        private readonly eventPublisher: EventPublisher,
        private readonly factory: AppFactory,
        private readonly repository: AppRepository,
    ) { }

    public async execute(command: RestoreItemCommand): Promise<void> {
        const { id } = command;
        const model = await this.repository.findById(id);
        const item = this.eventPublisher.mergeObjectContext(model);
        item.restore();
        item.commit();
        await this.repository.save(item);
    }
}