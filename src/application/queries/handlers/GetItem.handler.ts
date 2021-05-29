import {EventPublisher, IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetItemQuery} from "../impl/GetItem.query";
import {AppFactory} from "../../../domain/factories/app.factory";
import {AnemicApp} from "../../../domain/models/app.model";
import {RpcException} from "@nestjs/microservices";
import {HttpStatus} from "@nestjs/common";
import {AppRepository} from "../../../infrastructure/repositories/app.repository";

@QueryHandler(GetItemQuery)
export class GetItemHandler implements IQueryHandler<GetItemQuery> {

    constructor(
        private readonly eventPublisher: EventPublisher,
        private readonly factory: AppFactory,
        private readonly repository: AppRepository,
    ) {}

    public async execute(query: GetItemQuery): Promise<AnemicApp> {
        const data = await this.repository.findById(query.id);
        if (data !== null) {
            return data.toAnemic();
        }
        throw new RpcException({
            code: HttpStatus.NOT_FOUND,
            message: `Entity with ID ${query.id} not found`
        })
    }
}