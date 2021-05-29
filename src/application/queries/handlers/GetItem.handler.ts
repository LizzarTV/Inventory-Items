import {EventPublisher, IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetItemQuery} from "../impl/GetItem.query";
import {AppFactory} from "../../../domain/factories/app.factory";
import {AnemicApp} from "../../../domain/models/app.model";
import {RpcException} from "@nestjs/microservices";
import {HttpStatus} from "@nestjs/common";

@QueryHandler(GetItemQuery)
export class GetItemHandler implements IQueryHandler<GetItemQuery> {

    constructor(
        private readonly eventPublisher: EventPublisher,
        private readonly factory: AppFactory,
        // TODO: Add Repository
    ) {}

    public async execute(query: GetItemQuery): Promise<AnemicApp> {
        const data = null; // TODO: Replace with Repository Call
        if (data !== null) {
            return data.toAnemic();
        }
        throw new RpcException({
            code: HttpStatus.NOT_FOUND,
            message: `Entity with ID ${query.id} not found`
        })
    }
}