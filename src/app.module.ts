import {HttpModule, Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {ApplicationModule} from "./application/application.module";
import {DomainModule} from "./domain/domain.module";
import {InfrastructureModule} from "./infrastructure/infrastructure.module";
import {InterfaceModule} from "./interface/interface.module";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    ApplicationModule,
    DomainModule,
    InfrastructureModule,
    InterfaceModule,
  ],
})
export class AppModule {}
