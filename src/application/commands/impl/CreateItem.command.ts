import { ICommand } from '@nestjs/cqrs';

export class CreateItemCommand implements ICommand {
    constructor(public readonly title: string) {}
}