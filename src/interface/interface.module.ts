import { Module } from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {AppController} from "./controllers/app.controller";

@Module({
    imports: [CqrsModule],
    controllers: [AppController],
})
export class InterfaceModule {}
