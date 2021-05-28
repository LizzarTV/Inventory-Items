import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

const Handlers = [];

@Module({
    imports: [DomainModule, InfrastructureModule],
    providers: [...Handlers],
    exports: [...Handlers],
})
export class ApplicationModule {}
