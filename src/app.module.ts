import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronjobModule } from './cron-job/cron-job.module';

@Module({
  imports: [CronjobModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
