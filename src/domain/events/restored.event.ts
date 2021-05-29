import { IEvent } from "@nestjs/cqrs";
import { AnemicApp } from "../models/app.model";

export class RestoredDomainEvent implements IEvent {

    constructor(public readonly data: AnemicApp) { }
}