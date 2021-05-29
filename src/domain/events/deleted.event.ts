import { IEvent } from "@nestjs/cqrs";
import { AnemicApp } from "../models/app.model";

export class DeletedDomainEvent implements IEvent {
    constructor(public readonly data: AnemicApp) { }
}