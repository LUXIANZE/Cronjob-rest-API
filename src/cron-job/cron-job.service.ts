import { Injectable, Param, Put } from "@nestjs/common";
import { Cronjob, JobStatus } from "src/entity/cron-job/cronjob.entity";
import { CronjobDS } from "src/inmemory-ds/cron-job/cron-job.ds";

@Injectable()
export class CronjobService {
    findOneByJobId(jobId: number): Cronjob | null {
        console.log("findOneByJobId >>:", jobId);
        const res = CronjobDS.get(jobId);
        console.log("findOneByJobId res>>:", res);
        return res;
    }

    getAllJobs(): Cronjob[] {
        let allJobs: Cronjob[] = [];
        CronjobDS.forEach(job => {
            allJobs.push(job);
        })
        return allJobs;
    }

    startJob(jobName: string): boolean {
        const jobId: number = new Date().getTime();
        try {
            CronjobDS.set(jobId, this.constructJob(jobId, jobName))
            const currentJob: Cronjob = CronjobDS.get(jobId);
            setTimeout(() => {
                currentJob.jobStatus = JobStatus.STARTING;
                currentJob.jobStartDatetime = new Date();

                setTimeout(() => {
                    currentJob.jobStatus = JobStatus.RUNNING

                    setTimeout(() => {

                        if (Math.random() > 0.5) {
                            currentJob.jobStatus = JobStatus.STOPPING

                            setTimeout(() => {
                                currentJob.jobStatus = JobStatus.SUCCEEDED
                                currentJob.jobEndDatetime = new Date()
                            }, 1000)
                        } else {
                            currentJob.jobStatus = JobStatus.FAILED
                            currentJob.remarks = 'Job Execution Failed: netError 500 while GET: https://192.168.11.122:8801/api/v2/Account/asdjljdkqwoiu123adusoi90adjskl8123jladas'
                        }

                    }, 1000)
                }, 1000)
            }, 1000)
            return true;
        } catch (e) {
            return false;
        }
    }

    @Put(":jobId")
    restartFailedJob(@Param("jobId") jobId: number): string {
        try {
            const job = CronjobDS.get(jobId);

            if (job.jobStatus !== JobStatus.FAILED) {
                throw new Error("Not a failed job!");
            } else {
                setTimeout(() => {
                    job.jobStatus = JobStatus.RUNNING;

                    setTimeout(() => {
                        job.jobStatus = JobStatus.SUCCEEDED;
                        job.remarks = '';
                        job.jobEndDatetime = new Date();

                        return JSON.stringify(job);
                    }, 1000)
                }, 1000)
            }

        } catch (e) {
            return e;
        }
    }

    private constructJob(jobId: number, jobName: string): Cronjob {
        return {
            jobId: jobId,
            jobName: jobName,
            jobStatus: JobStatus.QUEUING,
            jobStartDatetime: null,
            jobEndDatetime: null,
            remarks: ''
        }
    }
}