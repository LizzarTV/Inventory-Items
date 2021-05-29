import { AnemicApp } from "../models/app.model";
import { IEvent } from "@nestjs/cqrs";

export class CreatedDomainEvent implements IEvent {

    constructor(public readonly data: AnemicApp) {}

}