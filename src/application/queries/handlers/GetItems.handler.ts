import {EventPublisher, IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetItemsQuery} from "../impl/GetItems.query";
import {AppFactory} from "../../../domain/factories/app.factory";
import {AnemicApp} from "../../../domain/models/app.model";
import {AppDomain} from "../../../domain/aggregates/app.domain";
import {RpcException} from "@nestjs/microservices";
import {HttpStatus} from "@nestjs/common";
import {AppRepository} from "../../../infrastructure/repositories/app.repository";

@QueryHandler(GetItemsQuery)
export class GetItemsHandler implements IQueryHandler<GetItemsQuery> {

    constructor(
        private readonly eventPublisher: EventPublisher,
        private readonly factory: AppFactory,
        private readonly repository: AppRepository,
    ) {}

    public async execute(query: GetItemsQuery): Promise<AnemicApp[]> {
        const data = await this.repository.findList();
        if (data !== null) {
            return data.map((item: AppDomain) => item.toAnemic());
        }
        throw new RpcException({
            code: HttpStatus.NOT_FOUND,
            message: 'No Entities found',
        });
    }
}