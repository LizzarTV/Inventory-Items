import { ICommand } from "@nestjs/cqrs";
import { Optional } from "../../../shared";

export class UpdateItemCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly title: Optional<string>,
        public readonly active: Optional<boolean>,
    ) { }
}