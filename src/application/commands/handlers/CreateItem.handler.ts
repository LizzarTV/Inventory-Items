import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {CreateItemCommand} from "../impl/CreateItem.command";
import {AppFactory} from "../../../domain/factories/app.factory";
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';
import {RpcException} from "@nestjs/microservices";
import {HttpStatus} from "@nestjs/common";
import {AppRepository} from "../../../infrastructure/repositories/app.repository";

@CommandHandler(CreateItemCommand)
export class CreateItemHandler implements ICommandHandler<CreateItemCommand> {
    constructor(
        private readonly eventPublisher: EventPublisher,
        private readonly factory: AppFactory,
        private readonly repository: AppRepository
    ) {}

    public async execute(command: CreateItemCommand) {
        const { title } = command;
        await this.validateItem(title);
        //
        const id = uuidv4();
        const slug = slugify(title, {
            replacement: '-',
            lower: true,
            locale: 'de',
        });
        //
        const item = this.eventPublisher.mergeObjectContext(
            this.factory.createFactory({ id, title, slug, active: false }),
        );
        item.commit();
        await this.repository.save(item);
    }

    private async validateItem(title: string): Promise<void> {
        const categories = await this.repository.findByTitle(title);
        if (!title || title.trim().length === 0) {
            throw new RpcException({
                code: HttpStatus.BAD_REQUEST,
                message: 'Title can not be empty',
            });
        } else if (categories !== null) {
            throw new RpcException({
                code: HttpStatus.BAD_REQUEST,
                message: 'Item already exists',
            });
        }
    }
}