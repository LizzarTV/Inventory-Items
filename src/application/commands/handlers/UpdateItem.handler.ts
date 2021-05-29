import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {AppFactory} from "../../../domain/factories/app.factory";
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';
import {RpcException} from "@nestjs/microservices";
import {HttpStatus} from "@nestjs/common";
import {UpdateItemCommand} from "../impl/UpdateItem.command";
import {AppDomain} from "../../../domain/aggregates/app.domain";
import {Optional} from "../../../shared";

@CommandHandler(UpdateItemCommand)
export class UpdateItemHandler implements ICommandHandler<UpdateItemCommand> {
    constructor(
        private readonly eventPublisher: EventPublisher,
        private readonly factory: AppFactory,
        // TODO: Add Repository
    ) {}

    public async execute(command: UpdateItemCommand) {
        const { id, title, active } = command;
        await this.validateItem(id, title, active);
    }

    private updateTitle(item: AppDomain, title: string): void {
        if (title !== undefined) {
            item.updateTitle(title);
            const newSlug = slugify(title, {
                replacement: '-',
                lower: true,
                locale: 'de',
            });
            item.updateSlug(newSlug);
        }
    }

    private updateActive(item: AppDomain, active: boolean): void {
        if (active !== undefined) {
            item.updateActive(active);
        }
    }

    private async validateItem(id: string, title: Optional<string>, active: Optional<boolean>): Promise<void> {
        const model = null; // TODO: Replace with Repository Call
        if (model === null) {
            throw new RpcException({
                code: HttpStatus.NOT_FOUND,
                message: 'Entity not found',
            });
        }
        if (title !== undefined) {
            if (title.trim().length === 0) {
                throw new RpcException({
                    code: HttpStatus.BAD_REQUEST,
                    message: 'Title can not be empty',
                });
            }
        }
    }

}