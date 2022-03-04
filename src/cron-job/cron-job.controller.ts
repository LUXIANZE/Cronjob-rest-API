import { Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Cronjob, JobStatus } from "src/entity/cron-job/cronjob.entity";
import { CronjobService } from "./cron-job.service";

@Controller("cronjob")
export class CronJobController {
    constructor(private readonly cronjobService: CronjobService) { }

    @Get()
    getAllJobs(): Cronjob[] {
        return this.cronjobService.getAllJobs();
    }

    @Get(":jobId")
    getCronJobDetailsById(@Param("jobId") jobId: number): Cronjob {
        console.log("getCronJobDetailsById >>:", jobId);
        return this.cronjobService.findOneByJobId(jobId);
    }

    @Post(":jobName")
    startJob(@Param("jobName") jobName: string): boolean {
        console.log("startJob >>:", jobName);
        return this.cronjobService.startJob(jobName);
    }

    @Put(":jobId")
    restartJob(@Param("jobId") jobId: number): string {
        console.log("restartJob >>:", jobId);
        return this.cronjobService.restartFailedJob(jobId);
    }

}