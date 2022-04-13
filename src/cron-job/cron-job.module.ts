import { Module } from '@nestjs/common';
import { CronJobController } from './cron-job.controller';
import { CronjobService } from './cron-job.service';

@Module({
  providers: [CronjobService],
  controllers: [CronJobController],
})
export class CronjobModule {}
