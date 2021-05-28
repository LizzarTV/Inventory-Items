import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, RmqOptions, Transport} from "@nestjs/microservices";
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
async function bootstrapMicroservice() {
  const { AMQP_CONNECTION_STRING, AMQP_QUEUE } = process.env;
  //
  const clientOptions = {
    transport: Transport.RMQ,
    options: {
      urls: [`${AMQP_CONNECTION_STRING || 'amqp://localhost:5672/'}`],
      queue: AMQP_QUEUE || 'queue',
      queueOptions: {
        durable: false,
      },
      noAck: false,
    },
  } as RmqOptions;
  //
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      clientOptions,
  );
  app.listen(() => Logger.debug('Item Service is listening...'));
}
bootstrapMicroservice();
