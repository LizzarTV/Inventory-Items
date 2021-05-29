import { ICommand } from "@nestjs/cqrs";

export class RestoreItemCommand implements ICommand {
    constructor(
        public readonly id: string,
    ) { }
}