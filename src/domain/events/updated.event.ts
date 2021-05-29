import { IEvent } from "@nestjs/cqrs";
import { AnemicApp } from "../models/app.model";

export class UpdatedDomainEvent implements IEvent {

    constructor(public readonly data: AnemicApp) { }
}