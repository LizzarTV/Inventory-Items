import { IEvent } from "@nestjs/cqrs";
import { AnemicApp } from "../models/app.model";

export class ErrorDomainEvent implements IEvent {

    constructor(public readonly data: AnemicApp) {}

}