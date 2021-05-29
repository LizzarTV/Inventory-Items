import { Module } from '@nestjs/common';
import {AppFactory} from "./factories/app.factory";

const Factories = [AppFactory];

@Module({
    providers: [...Factories],
    exports: [...Factories],
})
export class DomainModule {}
