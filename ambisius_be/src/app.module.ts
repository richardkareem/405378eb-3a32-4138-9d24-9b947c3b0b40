import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WorkerController } from './Controllers/worker.controller';
import { PrismaService } from './Models/services/prisma.service';
import { WorkerService } from './Models/services/worker.service';

@Module({
  imports: [],
  controllers: [WorkerController],
  providers: [AppService, PrismaService, WorkerService],
})
export class AppModule {}
