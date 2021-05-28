import { Module } from '@nestjs/common';

const Factories = [];

@Module({
    providers: [...Factories],
    exports: [...Factories],
})
export class DomainModule {}
